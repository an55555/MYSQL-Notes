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
var joinSQL = 'SELECT a.job,b.name from user2 a inner join user b on a.username=b.username';
var joinSQL2 = 'SELECT a.job,b.name from user2 a inner join user b on a.username=b.username where job="前端er"';
var leftjoinSQL = 'SELECT a.job,b.name from user2 a LEFT join user b on a.username=b.username';
var rightjoinSQL = 'SELECT a.job,b.name from user2 a RIGHT join user b on a.username=b.username';
connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(leftjoinSQL, function(err,result){
            if(err){
                console.log("查询失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})