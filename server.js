const http = require("http");
const app = require("./app");
const { initSocket } = require("./socket/socket");
require("dotenv").config();

const port = process.env.PORT || process.env.PORT;
const server = http.createServer(app);

initSocket(server);

server.listen(port, () => {
  console.log("listening on " + port);
});
