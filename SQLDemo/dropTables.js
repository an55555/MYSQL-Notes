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
var dropTABLES="DROP TABLE personinfo2"

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(dropTABLES, function(err,result){
            if(err){
                console.log("删除表失败")
                // throw err
            }else{
                console.log("删除表成功")
            }
        })
    }
})