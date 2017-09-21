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
var orderbySQL = 'SELECT * from user order by id DESC  LIMIT 3 ';  //DESC降序   ASC升序
var orderbySQL2 = 'SELECT * from user where name like "%州4%" AND age like "%8%"';


connection.connect(function(err){
    if(err){
        console.log("数据库连接失败");
        throw(err)
    }else{
        console.log("数据库连接成功");
        connection.query(orderbySQL, function(err,result){
            if(err){
                console.log("查询失败")
                // throw err
            }else{
                console.log(result)
            }
        })
    }
})