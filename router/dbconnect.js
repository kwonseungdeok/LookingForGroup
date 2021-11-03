require('dotenv').config();
// mssql 연동
var sql = require('mssql');
var config = {
    user: process.env.user,
    password: process.env.password,
    port: Number(process.env.port),
    server: process.env.server,
    database: process.env.database,
    stream: true,
    encrypt: false
}

// sql.connect(config, function(err){
//     if(err){
//         return console.error('error : ', err);
//     }
//     console.log('MSSQL 연결 완료')
// })

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("연결 완료");
        return pool;
    })
    .catch((err) => console.log(err));

module.exports = {
    sql,
    poolPromise
}