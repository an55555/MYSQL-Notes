/**
 * Created by Administrator on 2017/2/5.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs',
    port: 3306
});
conn.connect();

var insertSQL = 'insert into user(name) values("conan"),("fens.me")';
var selectSQL = 'select * from user limit 10';
var deleteSQL = 'delete from user';
var updateSQL = 'update user set name="conan update"  where name="conan"';

conn.query(insertSQL, function (err1, res1) {
    if (err1) console.log(err1);
    console.log("INSERT Return ==> ");
    console.log(res1);
});

//conn.end();