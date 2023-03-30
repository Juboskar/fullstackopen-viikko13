const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(errorHandler);

module.exports = app;
