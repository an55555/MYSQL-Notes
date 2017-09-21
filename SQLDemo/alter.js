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
var addSQL= 'ALTER  TABLE  user  add updateAt DATETIME';
var dropSQL= 'ALTER  TABLE  user  DROP  new';
var dropSQL2= 'ALTER  TABLE  user MODIFY  new  CHAR(10)'; //修改字段new的类型
var dropSQL3= 'ALTER  TABLE  user CHANGE  new2 createAt DATETIME'; //修改字段new的名字及类型
var dropSQL6= 'ALTER  TABLE  user MODIFY  new  CHAR(10) NOT NULL DEFAULT 100'; //修改字段new的类型为not null并设置默认值
var dropSQL4= 'ALTER  TABLE  user  ALTER  new  DEFAULT 1000;';//修改默认值
var dropSQL5='ALTER TABLE testalter_tbl RENAME TO alter_tbl;'//修改表名
/*
* ALTER TABLE testalter_tbl ADD i INT FIRST;   字段i添加到第一列
* ALTER TABLE testalter_tbl ADD i INT AFTER c;  字段i添加至字段c之后
* */
connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(addSQL, function(err,result){
            if(err){
                console.log("添加字段失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})