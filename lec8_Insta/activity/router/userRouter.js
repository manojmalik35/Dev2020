const express = require("express");
const userRouter = new express.Router();

let { createUser, getUser, updateUser, deleteUser, getAllUsers, handleRequest, acceptRequest, rejectRequest, getAllFollowers } = require("../controller/userController");
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/fr").post(handleRequest);//follow request
userRouter.route("/fr/:uid").get(getAllFollowers);
userRouter.route("/fr/:uid/:follower_id").patch(acceptRequest).delete(rejectRequest);//follow request accept or reject
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;