/**
 * Created by Administrator on 2017/2/6.
 */
var mysql = require('mysql');
var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
});
var createSQL='CREATE DATABASE RUNOOB';

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(createSQL, function(err,result){
            if(err){
                console.log("创建数据库失败")
                // throw err
            }else{
                console.log("创建数据库成功")
            }
        })
    }
})