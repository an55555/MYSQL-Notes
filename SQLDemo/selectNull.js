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
var selectSQL= 'SELECT * from user where username IS NOT NULL';
var selectSQL2= 'SELECT * from user where username IS  NULL';

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(selectSQL, function(err,result){
            if(err){
                console.log("查询失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})