import * as fs from "node:fs"
import * as http from "node:http"
import * as path from "node:path"

const FIXTURE_PORT = 3999;

export default async function globalSetup() {
  const fixturesDir = new URL("fixtures", import.meta.url).pathname;

  const server = http.createServer((req, res) => {
    const fileName = req.url?.replace(/^\//, "") ?? "";
    const filePath = path.join(fixturesDir, fileName);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, corsHeaders);
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404, corsHeaders);
      res.end(JSON.stringify({ error: "Not found" }));
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.listen(FIXTURE_PORT, resolve);
  });

  console.log(`[fixture-server] Listening on http://localhost:${FIXTURE_PORT}`);

  // Return a teardown function — Playwright calls this after all tests finish
  return async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    console.log("[fixture-server] Shut down");
  };
}
