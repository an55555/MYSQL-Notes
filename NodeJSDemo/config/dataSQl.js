/**
 * Created by Administrator on 2017/8/15.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'wp'
});
module.exports=pool