import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { consoleStyle } from "./lib/console-style.js";
import { existsSync, mkdirSync } from "node:fs";
import { LOG_DIR, logToFile } from "./lib/log-to-file.js";
import { config } from "./config.js";

// Ensure the log directory exists
if (!existsSync(LOG_DIR)) {
  mkdirSync(LOG_DIR, { recursive: true });
}

const app = new Hono();

let counter = 0;

// Explicitly allow OPTIONS (preflight) so clients don't get blocked
app.options("*", (c) => {
  return c.text("OK", 200);
});

app.all("*", async (c) => {
  try {
    let body = {};
    if (c.req.method !== "GET" && c.req.method !== "DELETE") {
      try {
        body = await c.req.json();
      } catch {
        // ignore empty or invalid JSON
        body = {};
      }
    }

    const headers = c.req.raw.headers; // raw headers are iterable
    const headerObj: Record<string, string> = {};
    for (const [key, value] of headers.entries()) {
      headerObj[key] = value;
    }

    consoleStyle.group("\n\n--- [WEBHOOK RECEIVED] ---", () => {
      console.log("--------------------------");
      console.log("Counter:", ++counter);
      console.log("Date:", new Date().toISOString());
      console.log("Path:", c.req.path);
      console.log("Received Webhook Header:", headerObj);
      console.log("Received Webhook Body:", body);
    });

    logToFile({
      header: headerObj,
      body,
    });

    return c.json({ message: "Webhook received on " + c.req.path });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return c.json({ error: "Invalid payload" }, 400);
  }
});

console.log(`Server is running on http://localhost:${config.port}`);

serve({
  fetch: app.fetch,
  port: config.port,
});
