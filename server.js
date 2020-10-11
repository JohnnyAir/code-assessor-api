const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");
const cors = require("cors");
const app = express();
const {
  respondWithSuccess,
  respondWithWarning,
} = require("./helpers/responseHandler");

const port = process.env.PORT || 2000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (_, res) => respondWithSuccess(res, 200, '{app:"CodeIT"}'));

app.use(apiRouter);

app.all("*", (_, res) => respondWithWarning(res, 404, "route not found"));

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

app.set("port", port);

const server = http.createServer(app);

server.on("error", errorHandler);

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

export default app;
