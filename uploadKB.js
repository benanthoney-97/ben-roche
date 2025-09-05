// uploadKB.js
import fetch from "node-fetch";
import fs from "fs";

// ⚡ EDIT THIS: put one or more URLs you want to upload
const urls = [
  "https://www.oclvision.com/seasonal-allergies-relief/",
  // "https://www.example.com/page2",
];

const API_KEY = process.env.ELEVEN_API_KEY; // safer: set env var ELEVEN_API_KEY
if (!API_KEY) {
  console.error("❌ Please set ELEVEN_API_KEY in your environment first.");
  process.exit(1);
}

const OUTPUT_LOG = "kb_upload_log.json";

async function uploadUrl(url) {
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/convai/knowledge-base/url", {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`✅ Uploaded: ${url}`);
    return { url, data };
  } catch (err) {
    console.error(`❌ Failed for ${url}:`, err.message);
    return { url, error: err.message };
  }
}

async function main() {
  const results = [];
  for (const url of urls) {
    if (!url) continue;
    const result = await uploadUrl(url);
    results.push(result);
  }

  // Append results to a log file
  fs.appendFileSync(OUTPUT_LOG, JSON.stringify(results, null, 2) + "\n");
  console.log(`\n📄 Logged results to ${OUTPUT_LOG}`);
}

main();