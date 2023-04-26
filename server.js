const express = require("express");

const morgan = require("morgan");
require("dotenv").config();

const app = express();

const { connectMongo } = require("./src/db/connection");
const { postRouter } = require("./src/routers/postsRouter.js");
const { authRouter } = require("./src/routers/authRouter.js");
const { errorHandler } = require("./src/helpers/apiHelpers");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
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
