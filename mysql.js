const mysql = require('mysql');



var pool = mysql.createPool({
    "connectionLimit" : 1000,
    'timeout': 60 * 60 * 1000,
    'connectTimeout'  : 60 * 60 * 1000,
    'acquireTimeout'  : 60 * 60 * 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE_YUGI,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if(error) {
                reject(error);
            }else {
                resolve(result)
            }
        })
    })
}

exports.pool = pool;