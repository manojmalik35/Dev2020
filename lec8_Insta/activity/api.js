const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");

app.use(express.static(__dirname + "/view"));
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


app.listen(4000, function () {
    console.log("Server is listening at port 4000.");
})