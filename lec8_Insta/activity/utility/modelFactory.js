const db = require("./connection");
const { v4: uuidv4 } = require('uuid');

module.exports.createEntity = function create(entity){


    return function(entityObj){

        entityObj.id = uuidv4();
        if(entity == "post"){
            let date = new Date();
            entityObj.created_at = date.toISOString().slice(0, 19).replace('T', ' ');
        }

        return new Promise(function(resolve, reject){
            var query = db.query(`INSERT INTO ${entity} SET ?`, entityObj, function(err, result) {
                if(err)
                    reject(err);
                else
                    resolve(entityObj);
            });
        })
    }
}

module.exports.getEntityById = function get(entity){

    return function(uid) {

        return new Promise(function (resolve, reject) {
            db.query(`select * from ${entity} where uid="${uid}"`, function (err, result) {
                if (err)
                    reject(err);
                else
                    resolve(result[0]);
            });
        })
    }
}