
const { createEntity, getEntityById } = require("../utility/modelFactory");

const createPost = createEntity("post");

const getById = getEntityById("post");

module.exports.create = createPost;
module.exports.getById = getById;