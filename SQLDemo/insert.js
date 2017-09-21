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
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
console.log(Date.now())
var insertSQL = 'insert into user(username,name,age,createAt) values("adsc23","兰江州50","200",now())';

connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(insertSQL, function(err,result){
            if(err){
                console.log("数据插入失败")
                // throw err
            }else{
                console.log("数据插入成功")
            }
        })
    }
})