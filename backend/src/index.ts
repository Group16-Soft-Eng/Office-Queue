import {app}  from "@app";
import { CONFIG } from "@config";
import { initializeDatabase } from "@database";
import {initializeCounters} from "@dao/CounterDAO"

let server;

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(CONFIG.PORT);
    console.log("Server Started")
    initializeCounters();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();