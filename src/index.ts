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

app.all("*", async (c) => {
  try {
    const body = await c.req.json(); // Parse JSON payload
    const head = await c.req.header();
    consoleStyle.group("\n\n--- [WEBHOOK RECEIVED] ---", () => {
      console.log("--------------------------");
      console.log("Counter:", ++counter);
      console.log("Date:", new Date().toISOString());
      console.log("Path:", c.req.path);
      console.log("Received Webhook Header:", head);
      console.log("Received Webhook Body:", body);
    });
    logToFile({
      header: head,
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
