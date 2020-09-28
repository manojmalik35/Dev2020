const db = require("./connection");

const { createEntity, getEntityById } = require("../utility/modelFactory");

const createUser = createEntity("user");

const getById = getEntityById("user");

function getAll() {
    return new Promise(function (resolve, reject) {
        db.query(`select * from user`, function (err, result) {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    })
}

function updateById(uid, updateObj) {

    var updateStr = "";
    for (let key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}", `;
    }

    updateStr = updateStr.substring(0, updateStr.length - 2);
    var query = `update user set ${updateStr} where id="${uid}"`;
    // console.log(query);
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    })
}

function deleteById(uid) {
    return new Promise(function (resolve, reject) {
        var query = db.query(`delete from user where id="${uid}"`, function (err, result) {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    })
}


module.exports.create = createUser;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
module.exports.getAll = getAll;