const express = require("express");
const userRouter = new express.Router();

let { createUser, getUser, updateUser, deleteUser } = require("../controller/userController");
userRouter.post("/", createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;