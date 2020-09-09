const db = require("./connection");
const { v4: uuidv4 } = require('uuid');

function create(userObj){
    
    userObj.uid = uuidv4();
    return new Promise(function(resolve, reject){
        var query = db.query('INSERT INTO user SET ?', userObj, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(userObj);
        });
    })
}

function getById(uid){
    return new Promise(function(resolve, reject){
        db.query(`select * from user where uid="${uid}"`, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result[0]);
        });
    })
}

function getAll(){
    return new Promise(function(resolve, reject){
        db.query(`select * from user`, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result);
        });
    })
}

function updateById(uid, updateObj){

    var updateStr = "";
    for(let key in updateObj){
        updateStr += `${key} = "${updateObj[key]}", `;
    }

    updateStr = updateStr.substring(0, updateStr.length - 2);
    var query = `update user set ${updateStr} where uid="${uid}"`;
    // console.log(query);
    return new Promise(function(resolve, reject){
        db.query(query, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result);
        });
    })
}

function deleteById(uid){
    return new Promise(function(resolve, reject){
        var query = db.query(`delete from user where uid="${uid}"`, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result);
        });
    })
}


module.exports.create = create;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
module.exports.getAll = getAll;