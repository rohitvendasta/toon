# 🧩 TOON – Token-Oriented Object Notation  
**Lightweight · Faster · Cheaper AI Data Format**

TOON (Token-Oriented Object Notation) is a lightweight, token-efficient alternative to JSON designed for AI data exchange.  
It helps you **reduce token usage**, **speed up model responses**, and **cut OpenAI API costs** — all while keeping your data **human-readable**.

---

<section id="example">
  <h2>📂 Example</h2>

  <h3>JSON Input</h3>
  <pre><code class="language-json">{
  "name": "Rohit",
  "age": 26,
  "city": "Chennai"
}</code></pre>

  <h3>TOON Input</h3>
  <pre><code>name: Rohit
age: 26
city: Chennai
</code></pre>

  <p>✅ Same meaning, fewer tokens, faster response.</p>
</section>

---

<section id="benchmark">
  <h2>📊 Benchmark Result (Using GPT-4o-mini)</h2>

  <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
    <thead style="background-color: #f2f2f2;">
      <tr>
        <th>Metric</th>
        <th>JSON</th>
        <th>TOON</th>
        <th>Improvement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Input Size</td>
        <td>10.2 KB</td>
        <td>4.1 KB</td>
        <td>↓ 60%</td>
      </tr>
      <tr>
        <td>Response Time</td>
        <td>2.8 sec</td>
        <td>1.4 sec</td>
        <td>⚡ 2× faster</td>
      </tr>
      <tr>
        <td>OpenAI Cost (est.)</td>
        <td>$0.0012</td>
        <td>$0.00048</td>
        <td>💰 60% cheaper</td>
      </tr>
    </tbody>
  </table>

  <p style="margin-top: 10px;">TOON achieves equivalent results with less data and lower cost.</p>
</section>

---

<section id="setup">
  <h2>🛠️ Local Setup Guide</h2>

  <h3>Step 1 – Install Dependencies</h3>
  <p>Initialize your Node.js project and install required packages:</p>

  <pre><code>npm init -y
npm install express axios dotenv body-parser
npm install --save-dev typescript ts-node @types/node @types/express
</code></pre>

  <h3>Step 2 – Create <code>tsconfig.json</code></h3>
  <p>Add the following TypeScript configuration file:</p>

  <pre><code class="language-json">{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}</code></pre>

  <h3>Step 3 – Create <code>.env</code></h3>
  <p>Store your OpenAI key securely:</p>

  <pre><code>OPENAI_API_KEY=sk-xxxxx-your-key
</code></pre>

  <h3>Step 4 – Run the Server</h3>
  <p>Use <code>ts-node</code> to start your app:</p>

  <pre><code>npx ts-node src/server.ts
</code></pre>

  <h3>Step 5 – Test the Endpoint</h3>
  <p>Once the server is running, test the API:</p>

  <pre><code>curl -X POST http://localhost:8080/ask \
  -H "Content-Type: application/json" \
  -d @src/test_request_json.json
</code></pre>

  <p>Toggle between modes:</p>

  <pre><code>"use_toon": true   →  uses TOON format
"use_toon": false  →  uses JSON format
</code></pre>

  <p>🎉 You’re ready to compare TOON vs JSON performance locally.</p>
</section>

---

### 📄 License
This project is released under the MIT License.

### 👨‍💻 Developer
Created by **Rohit shukla**, Software Engineer.  
Feedback, and ideas are welcome!

---
