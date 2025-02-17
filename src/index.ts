import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { consoleStyle } from "./lib/console-style.js";

const app = new Hono();

let counter = 0;

app.all("*", async (c) => {
  try {
    const body = await c.req.json(); // Parse JSON payload
    consoleStyle.group("\n\n--- [WEBHOOK RECEIVED] ---", () => {
      console.log("--------------------------");
      console.log("Counter:", ++counter);
      console.log("Date:", new Date().toISOString());
      console.log("Path:", c.req.path);
      console.log("Received Webhook:", body);
    });

    return c.json({ message: "Webhook received on " + c.req.path });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return c.json({ error: "Invalid payload" }, 400);
  }
});

const port = 8400;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
