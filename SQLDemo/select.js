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
var selectSQL = 'SELECT * from user';
var selectSQL2 = 'SELECT * from user where age>30';
var selectSQL21 = 'SELECT * from user where age>30 OR age<30';
var selectSQL3 = 'SELECT * from user LIMIT 4';
var selectSQL4 = 'SELECT * from user LIMIT 4 ,2';   //从第四条开始获取 读2条
var selectSQL5 = 'SELECT * from user LIMIT 4 OFFSET 2';   //使用offset不能单独全用？ 要跟limit一起


connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(selectSQL21, function(err,result){
            if(err){
                console.log("查询失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})