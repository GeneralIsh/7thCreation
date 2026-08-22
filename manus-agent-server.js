/**
 * Manus Local Agent Bridge Server
 * Wraps local Mac MCP servers (iMessage, Filesystem) into an HTTP/SSE endpoint
 * that ngrok can expose to Manus in the cloud.
 *
 * Port: 8080
 */

const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "Manus Local Agent Bridge is running",
    tools: ["imessage", "filesystem"],
    timestamp: new Date().toISOString(),
  });
});

// ─── SSE endpoint for MCP ─────────────────────────────────────────────────────
// Manus connects here as a remote MCP server via SSE transport
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sessionId = randomUUID();
  console.log(`[${new Date().toISOString()}] New SSE connection: ${sessionId}`);

  // Keep-alive ping every 15 seconds
  const keepAlive = setInterval(() => {
    res.write(`event: ping\ndata: ${JSON.stringify({ ts: Date.now() })}\n\n`);
  }, 15000);

  // Send the MCP server capabilities on connect
  const capabilities = {
    jsonrpc: "2.0",
    method: "notifications/initialized",
    params: {
      serverInfo: {
        name: "manus-local-agent",
        version: "1.0.0",
      },
      capabilities: {
        tools: {},
      },
    },
  };
  res.write(`event: message\ndata: ${JSON.stringify(capabilities)}\n\n`);

  req.on("close", () => {
    clearInterval(keepAlive);
    console.log(`[${new Date().toISOString()}] SSE disconnected: ${sessionId}`);
  });
});

// ─── MCP Message handler ──────────────────────────────────────────────────────
app.post("/message", async (req, res) => {
  const { method, params, id } = req.body;
  console.log(`[${new Date().toISOString()}] MCP call: ${method}`);

  try {
    if (method === "initialize") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "manus-local-agent", version: "1.0.0" },
          capabilities: { tools: {} },
        },
      });
    }

    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "imessage_search",
              description: "Search iMessages by text, contact, or date range",
              inputSchema: {
                type: "object",
                properties: {
                  query: { type: "string", description: "Text to search for" },
                  handle: { type: "string", description: "Phone number or email to filter by" },
                  limit: { type: "number", description: "Max results (default 20)" },
                },
              },
            },
            {
              name: "imessage_recent",
              description: "Get the most recent iMessages",
              inputSchema: {
                type: "object",
                properties: {
                  limit: { type: "number", description: "Number of messages (default 20)" },
                },
              },
            },
            {
              name: "imessage_chats",
              description: "List all iMessage conversations",
              inputSchema: {
                type: "object",
                properties: {
                  limit: { type: "number", description: "Number of chats (default 20)" },
                },
              },
            },
            {
              name: "filesystem_read",
              description: "Read a file from the local Mac filesystem",
              inputSchema: {
                type: "object",
                required: ["path"],
                properties: {
                  path: { type: "string", description: "Absolute file path to read" },
                },
              },
            },
            {
              name: "filesystem_list",
              description: "List files in a directory on the local Mac",
              inputSchema: {
                type: "object",
                required: ["path"],
                properties: {
                  path: { type: "string", description: "Absolute directory path to list" },
                },
              },
            },
          ],
        },
      });
    }

    if (method === "tools/call") {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      const result = await callLocalTool(toolName, toolArgs);
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        },
      });
    }

    return res.json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  } catch (err) {
    console.error(`Error handling ${method}:`, err.message);
    return res.json({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: err.message },
    });
  }
});

// ─── Local tool dispatcher ────────────────────────────────────────────────────
async function callLocalTool(toolName, args) {
  if (toolName === "imessage_search") {
    return runDenoMCP("imessage-mcp", "search_messages", args);
  }
  if (toolName === "imessage_recent") {
    return runDenoMCP("imessage-mcp", "get_recent_messages", args);
  }
  if (toolName === "imessage_chats") {
    return runDenoMCP("imessage-mcp", "get_chats", args);
  }
  if (toolName === "filesystem_read") {
    return readLocalFile(args.path);
  }
  if (toolName === "filesystem_list") {
    return listLocalDir(args.path);
  }
  throw new Error(`Unknown tool: ${toolName}`);
}

// ─── iMessage via Deno MCP ────────────────────────────────────────────────────
function runDenoMCP(binary, toolMethod, toolArgs) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      "/Users/yawamfusa/.deno/bin/deno",
      [
        "run",
        "--allow-read",
        "--allow-write",
        "--allow-env",
        "--allow-sys",
        "--allow-ffi",
        "--allow-net",
        "/Users/yawamfusa/.deno/bin/" + binary
      ],
      { env: { ...process.env, PATH: process.env.PATH + ":/Users/yawamfusa/.deno/bin:/opt/homebrew/bin" } }
    );

    const request = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "bridge", version: "1.0" } },
    });

    const toolCall = JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: toolMethod, arguments: toolArgs },
    });

    let output = "";
    let initialized = false;

    proc.stdout.on("data", (data) => {
      output += data.toString();
      const lines = output.split("\n");
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          if (msg.id === 1 && !initialized) {
            initialized = true;
            proc.stdin.write(toolCall + "\n");
          } else if (msg.id === 2) {
            proc.kill();
            resolve(msg.result || msg.error);
          }
        } catch (_) {}
      }
    });

    proc.stderr.on("data", (d) => console.error("[deno-mcp]", d.toString()));
    proc.on("error", reject);

    proc.stdin.write(request + "\n");

    setTimeout(() => {
      proc.kill();
      reject(new Error("iMessage MCP timeout"));
    }, 15000);
  });
}

// ─── Filesystem tools ─────────────────────────────────────────────────────────
const fs = require("fs");
const path = require("path");

// Security: only allow access within these directories
const ALLOWED_ROOTS = [
  "/Users/yawamfusa/Documents",
  "/Users/yawamfusa/Desktop",
  "/Users/yawamfusa/Downloads",
  "/Users/yawamfusa/manus-agent",
];

function isAllowedPath(filePath) {
  const resolved = path.resolve(filePath);
  return ALLOWED_ROOTS.some((root) => resolved.startsWith(root));
}

function readLocalFile(filePath) {
  if (!isAllowedPath(filePath)) {
    throw new Error(`Access denied: ${filePath} is outside allowed directories`);
  }
  const content = fs.readFileSync(filePath, "utf8");
  return { path: filePath, content };
}

function listLocalDir(dirPath) {
  if (!isAllowedPath(dirPath)) {
    throw new Error(`Access denied: ${dirPath} is outside allowed directories`);
  }
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return {
    path: dirPath,
    entries: entries.map((e) => ({
      name: e.name,
      type: e.isDirectory() ? "directory" : "file",
    })),
  };
}

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Manus Local Agent Bridge running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/`);
  console.log(`   MCP endpoint: http://localhost:${PORT}/sse`);
  console.log(`\n   Expose via ngrok: ngrok http ${PORT}`);
  console.log(`   Then add the ngrok URL to Manus as a Custom MCP connector.\n`);
});
