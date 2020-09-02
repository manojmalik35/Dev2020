const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


app.listen(3000, function () {
    console.log("Server is listening at port 3000.");
})