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
var groupSQL = 'SELECT name, count(age) from user group by name ';  //COUNT:次数，SUM总合，AVG平均数
var groupSQL2 = 'SELECT coalesce(name, "总数"), count(name) as namecount from user group by name WITH ROLLUP';
var groupSQL3 = 'SELECT coalesce(name, "总数"), count(name) as namecount from user group by name order by namecount';
connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(groupSQL3, function(err,result){
            if(err){
                console.log("查询失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})