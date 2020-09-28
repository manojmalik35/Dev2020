const express = require("express");
const userRouter = new express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'public');
    },
    filename : function(req, file, cb){
        let extension = file.mimetype.split("/").pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
    }
})

const fileFilter = function fileFilter (req, file, cb) {
 
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To accept the file pass `true`, like so:
    if(file.mimetype.startsWith("image"))
        cb(null, true)
    else
        cb(new Error('Not a image.'))
   
  }

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
})


let { createUser, getUser, updateUser, deleteUser, getAllUsers, handleRequest, acceptRequest, rejectRequest, getAllFollowers } = require("../controller/userController");
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/fr").post(handleRequest);//follow request
userRouter.route("/fr/:uid").get(getAllFollowers);
userRouter.route("/fr/:uid/:follower_id").patch(acceptRequest).delete(rejectRequest);//follow request accept or reject
userRouter.route("/:id").get(getUser).patch(upload.single("photo"), updateUser).delete(deleteUser);

module.exports = userRouter;