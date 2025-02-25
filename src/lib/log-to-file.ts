import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

export const LOG_DIR = "./log";
export const LOG_FILE = join(LOG_DIR, "webhook.log");

export const logToFile = (data: any) => {
  const timestamp = new Date().toISOString();
  const newEntry = `[${timestamp}] Received Webhook: ${JSON.stringify(data, null, 2)}\n`;

  let existingLogs = "";
  if (existsSync(LOG_FILE)) {
    existingLogs = readFileSync(LOG_FILE, "utf-8");
  }

  try {
    // Prepend new log entry before existing logs
    writeFileSync(LOG_FILE, newEntry + existingLogs);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
};
