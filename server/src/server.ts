import mongoose from "mongoose";
import config from "./config";
import http from "http";
import app from "./app";
const server = http.createServer(app);

async function main() {
  try {
    await mongoose.connect(config.db_uri as string);

    server.listen(5000, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
