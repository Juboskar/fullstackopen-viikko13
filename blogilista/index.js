const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start();
