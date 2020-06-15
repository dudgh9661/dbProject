const dotenv = require('dotenv')
const path = require('path')

if (!process.env.MYSQL_HOST) {
    dotenv.config({
        path: path.join(__dirname, "..", ".env")
    })
}

module.exports = {
    host: "101.101.210.110",
    username: "root",
    password: "1234",
    database: "db",
    dialect: 'mysql'
}

// var mysql = require('mysql');

// module.exports = {
//     host: "101.101.210.110",
//     username: "root",
//     password: "wjdxotjs",
//     database: "db",
//     dialect: 'mysql'
// };