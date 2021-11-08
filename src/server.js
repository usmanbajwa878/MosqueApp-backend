require('dotenv').config();
const http = require("http");
const app = require("./index");
const port = process.env.PORT;
const server = http.createServer(app);


server.listen(port, () => {
    console.log("server is online on port number" + port);
  });