const express = require("express");
const postRouter = new express.Router();

let { createPost, getPost, updatePost, deletePost } = require("../controller/postController");
postRouter.post("/", createPost); 
postRouter.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;
