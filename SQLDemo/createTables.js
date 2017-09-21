/**
 * Created by Administrator on 2017/2/6.
 */
var mysql = require('mysql');
var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'nodejs'
});
var createTABLES="CREATE TABLE personinfo2(id int,user varchar(255) NOT NULL,password varchar(255))"

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(createTABLES, function(err,result){
            if(err){
                console.log("创建表失败")
                // throw err
            }else{
                console.log("创建表成功")
            }
        })
    }
})