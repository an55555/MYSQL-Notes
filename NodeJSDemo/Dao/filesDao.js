/**
 * Created by Administrator on 2017/2/6.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'nodejs'
});
/*实体*/
var userEtity = ['remark', 'name', 'age', 'sex','state']
function userDao() {
        this.insert = addUser,
        this.delete = deleteUser,
        this.update = updateUser,
        this.query = queryUser
}

/*实现插入语句*/
function addUser(obj,fn) {
    console.log(Date.now())
    var unit = []
    var replaceUnit = []
    for (i in userEtity) {
        unit.push(obj[userEtity[i]])
        replaceUnit.push('?')
    }
    // var insertSQL = 'insert into user(username,name,age,createAt) values("adsc23","兰江州50兰江州50","200",now())';
    var insertSQL = "insert into user(" + userEtity.join(',') + ",createAt) values("+replaceUnit.join()+",now())";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败");
            return
            // throw(err)
        }
        connection.query(insertSQL, unit, function (err, result) {
            if (err) {
                console.log(insertSQL)
                console.log("数据插入失败")
                // throw err
            } else {
                console.log("数据插入成功")
                fn(result)
            }
            //回收pool
            connection.release();
        })
    })

}

/*实现删除语句*/
function deleteUser(obj,fn) {
    var deleteSQL = "DELETE FROM user WHERE id=?";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败");
            return
            // throw(err)
        }
        connection.query(deleteSQL, obj.id, function (err, result) {
            if (err) {
                console.log(err)
                console.log("数据删除失败")
                // throw err
            } else {
                console.log("数据删除成功")
                fn(result)
            }
            //回收pool
            connection.release();
        })
    })

}
/*实现更改语句*/
function updateUser(obj,fn) {
    console.log(Date.now())
    var unit = []
    for (i in userEtity) {
        unit.push(obj[userEtity[i]])
    }
    unit.push(obj.Id)
    var updateSQL = "UPDATE user set " + userEtity.join('=?,') + "=?" + " where id=?";
    // var updateSQL = "UPDATE user set remark='有没有';state='gg' where id=37";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败");
            return
            // throw(err)
        }
        connection.query(updateSQL, unit, function (err, result) {
            console.log(updateSQL);
            if (err) {
                console.log(err)
                console.log("数据更新失败")
                // throw err
            } else {
                console.log(unit)
                console.log("数据更新成功")
                fn(result)
            }
            //回收pool
            connection.release();
        })
    })

}
/*查询语句实现*/
function queryUser(obj, fn) {
    var querySQL = "select * FROM user";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接失败");
            return
            // throw(err)
        }
        connection.query(querySQL, function (err, result) {
            if (err) {
                console.log(err)
                console.log("数据查询失败")
                // throw err
            } else {
                console.log("数据查询成功")
                //回收pool
                connection.release();
                // res.send(result)
                // console.log(result)
                fn(result)
                // res.send({data:result});
                // return result
            }

        })
    })

}
// var ojb={
//     remark:"更改了ID为37的小静脉",
//     name:"小静脉",
//     age:100,
//     state:'good',
//     sex:'man',
//     id:37
// }
// userDao2=new userDao();
// userDao2.update(ojb)
/*
 userDao2=new userDao();
 userDao2.insert(ojb)*/
// userDao2=new userDao();
// userDao2.delete('小明明')
module.exports = userDao;