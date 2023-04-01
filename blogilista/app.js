const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const readingListsRouter = require("./controllers/readings");
const authorRouter = require("./controllers/authors");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/authors", authorRouter);
app.use(errorHandler);

module.exports = app;
