/**
 * Lightweight fixture server for local development.
 * Serves JSON files from tests/fixtures/ on a fixed port so the Remix SSR
 * loader can fetch them without depending on the Vite dev server's port.
 *
 * Started automatically by `npm run dev` via concurrently.
 */

import * as fs from "node:fs"
import * as http from "node:http"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

const PORT = 3999
const fixturesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../tests/fixtures"
)

const server = http.createServer((req, res) => {
  const fileName = req.url?.replace(/^\//, "") ?? ""
  const filePath = path.join(fixturesDir, fileName)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(fs.readFileSync(filePath))
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Not found", path: req.url }))
  }
})

server.listen(PORT, () => {
  console.log(`[fixture-server] Listening on http://localhost:${PORT}`)
})
