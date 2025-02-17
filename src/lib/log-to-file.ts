import { join } from "path";
import { appendFileSync } from "fs";

export const LOG_DIR = "./log";
export const LOG_FILE = join(LOG_DIR, "webhook.log");

export const logToFile = (data: any) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Received Webhook: ${JSON.stringify(data, null, 2)}\n`;

  try {
    appendFileSync(LOG_FILE, logEntry);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
};
