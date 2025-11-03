import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = 8080;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


function toTOON(data: Record<string, any>): string {
  const tokens: string[] = [];

  const flatten = (obj: any, prefix = "") => {
    for (const key in obj) {
      const val = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof val === "object" && val !== null) {
        flatten(val, path);
      } else {
        tokens.push(`${path}:${val}`);
      }
    }
  };

  flatten(data);
  return tokens.join(";");
}

function buildPrompt(prompt: string, data?: any, useTOON = false): string {
  if (!data) return prompt;

  if (useTOON) {
    const toonEncoded = toTOON(data);
    console.log("🎨 TOON format:\n", toonEncoded);
    return `${prompt}\n\nData (TOON format):\n${toonEncoded}`;
  } else {
    const jsonString = JSON.stringify(data, null, 2);
    console.log("📦 JSON format:\n", jsonString);
    return `${prompt}\n\nData (JSON format):\n${jsonString}`;
  }
}


app.post("/ask", async (req: Request, res: Response) => {
  try {
    const { prompt, data, use_toon } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing 'prompt' in request body" });
    }

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY environment variable" });
    }

    const fullPrompt = buildPrompt(prompt, data, use_toon);

    // Build OpenAI request body
    const payload = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
    };
    console.log("\n=======================");
    console.log("📤 OpenAI request :");
    console.log(JSON.stringify(payload, null, 2));
    console.log("=======================\n");

    const response = await axios.post(OPENAI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const aiResp = response.data;

    // Token summary
    const promptTokens = aiResp.usage?.prompt_tokens ?? 0;
    const completionTokens = aiResp.usage?.completion_tokens ?? 0;
    const totalTokens = aiResp.usage?.total_tokens ?? 0;

    console.log("==========================================");
    console.log(`✅ Format: ${use_toon ? "TOON" : "JSON"}`);
    console.log("🧠 OpenAI Response:", aiResp.choices?.[0]?.message?.content);
    console.log(
      `🔢 Tokens - Prompt: ${promptTokens} | Completion: ${completionTokens} | Total: ${totalTokens}`
    );
    console.log("==========================================\n");

    res.json({
      response: aiResp.choices?.[0]?.message?.content || "No response",
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      format: use_toon ? "toon" : "json",
    });
  } catch (err: any) {
    console.error("Error:", err.response?.data || err.message);
    res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}/ask`);
});
