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
var deleteDATA = 'DELETE FROM user WHERE name="fens.ME"';

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(deleteDATA, function(err,result){
            if(err){
                console.log("数据删除失败")
                // throw err
            }else{
                console.log("数据删除成功")
            }
        })
    }
})