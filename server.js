const express = require("express");

const morgan = require("morgan");
require("dotenv").config();

const app = require("express")();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", () => {
  console.log("New client connected!");
});
server.listen(3000);

const { connectMongo } = require("./src/db/connection");
const { postRouter } = require("./src/routers/postsRouter.js");
const { authRouter } = require("./src/routers/authRouter.js");
const { filesRouter } = require("./src/routers/filesRouter.js");
const { errorHandler } = require("./src/helpers/apiHelpers");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.static("build"));
app.use(morgan("tiny"));
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    server.listen(PORT, (err) => {
      if (err) {
        console.error("Error at a server launch:", err);
      }
      console.log(`Server works at port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
