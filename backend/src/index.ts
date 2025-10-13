import {app}  from "@app";
import { CONFIG } from "@config";
//import { closeDatabase, initializeDatabase } from "@database";

let server;

async function startServer() {
  try {
    app.listen(CONFIG.PORT);
    console.log("Server Started")
  } catch (error) {
  }
}


startServer();