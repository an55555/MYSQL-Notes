/**
 * Created by Administrator on 2017/2/6.
 */

/*var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'nodejs'
});*/
var pool=require('../config/dataSQl')
/*实体*/
var userEtity = ['roleName', 'rolePermission']  //获取的字段
var queryEtity=['roleId','roleName','rolePermission','isDefault','createAt']
var defaultEtity = [//默认字段
    {
        name:"createAt",
        value:Date.now()
    },
    {
        name:"isDefault",
        value:Date.now()
    }
]

var dataTableName='roles'
// var dataTableName='testdatas'
function userDao() {
        this.insert = addUser,
        this.delete = deleteUser,
        this.update = updateUser,
        this.query = queryUser
}

/*实现插入语句*/
function addUser(obj,fn) {
    // var inserEtity=[]  //合并默认字段和默认字段
    var unit = []   //字段对应的值
    var replaceUnit = []  //添加点位符
    for (i in userEtity) {
        // inserEtity.push(userEtity[i])
        unit.push(obj[userEtity[i]])
        replaceUnit.push('?')
    }

    // var insertSQL = 'insert into roles(roleName,rolePermission,isDefault,createAt) values("adsc23","兰江州50兰江州50","200",now())';
    var insertSQL = "insert into "+dataTableName+"(" + userEtity.join(',') + ",createAt,updateAt,isDefault) values("+replaceUnit.join()+",now(),now(),2)";
    var doSql=function (err,count) {
        if(err){fn(err,count);return}
        if(count){
            fn(-1,"角色已存在")
            return
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("数据库连接失败");

                return
                // throw(err)
            }

            connection.query(insertSQL, unit, function (err, result) {
                if (err) {
                    console.log(insertSQL)
                    console.log(err)
                    console.log("数据插入失败")
                    // throw err
                } else {
                    console.log("数据插入成功")
                    // fn(0,result)
                    getLastId(connection,fn)
                }
                //回收pool
                // connection.release();
            })
        })
    }
    queryUserCount(['roleName'],obj,doSql,true) //最后一参数通知查询数量的是否使用唯一查询

}

/*实现删除语句*/
function deleteUser(obj,fn) {
    var regex=/\w+/;
    var dele=obj.roleId.replace(regex,'?')
    var deleteSQL = "DELETE FROM "+dataTableName+" WHERE roleId in("+dele+")";

    var doSql=function (err,count) {
        if(err){fn(err,count);return}
        if(!count){
            fn(-1,"ID不存在")
            return
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("数据库连接失败");
                return
                // throw(err)
            }
            connection.query(deleteSQL, obj.roleId, function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("数据删除失败")
                    // throw err
                } else {
                    console.log(result)
                    fn(0,result)
                }
                //回收pool
                connection.release();
            })
        })
    }

    queryUserCount(['roleId'],obj,doSql)

}
/*实现更改语句*/
function updateUser(obj,fn) {
    console.log(Date.now())
    var unit = []
    for (i in userEtity) {
        unit.push(obj[userEtity[i]])
    }
    // unit.push()
    // unit.push(Date.now())
    var regex=/(?=,)|$/g;
    var upd=userEtity.join().replace(regex,'=?')
    var updateSQL = "UPDATE "+dataTableName+" set " + upd + ",updateAt=now() where roleId="+obj.roleId;
    // var updateSQL = "UPDATE user set remark='有没有';state='gg' where id=37";
    var doSql=function (err,count) {
        if(err){fn(err,count);return}
        if(!count){
            fn(-1,"ID不存在")
            return
        }
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
                    console.log("数据更新成功")
                    fn(0,"数据更新成功")
                }
                //回收pool
                connection.release();
            })
        })

    }
    queryUserCount(['roleId'],obj,doSql)

}
/*查询语句实现*/
function queryUser(obj,fn) {
    var limitstStart=obj.limitStart?obj.limitStart:0;  //获取开始页
    var limitNum=obj.limitNum?obj.limitNum:100;  //获取条数
    // var querySQL = "select " +queryEtity.join()+" FROM "+dataTableName +" WHERE roleName=?"+" limit "+limitstStart+","+limitNum ;
    var where=obj.roleName?" WHERE roleName like "+"'"+obj.roleName+"%'":""
    var querySQL = "select " +queryEtity.join()+" FROM "+dataTableName +where+" limit "+limitstStart+","+limitNum ;
    console.log(1111111111111111111111111111111)
    var doSql=function (err,count) {
        /*如果查找数量时就出错了就不用往下执行了*/
        if(err){fn(err,count);return}
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("数据库连接失败");
                return
                // throw(err)
            }
            connection.query(querySQL,function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("数据查询失败")
                    // throw err
                } else {
                    console.log("数据查询成功")
                    //回收pool
                    connection.release();
                    // res.send(result)
                    // console.log(count)
                    fn(0,result,count)
                    // res.send({data:result});
                    // return result
                }

            })
        })
    }

    var queryAllFilter=obj.roleName?['roleName']:[]
    queryUserCount(queryAllFilter,obj,doSql)


}
/*查询总量*/
function queryUserCount(queryAllFilter,obj, fn,like) {
    if(!queryAllFilter.length){
        var querySQL = "select count(*) FROM "+dataTableName;
    }else if(queryAllFilter[0]=='roleId'){  //如果查的是ID 具体查询
        if((!(/^\d+$/).test(obj[queryAllFilter[0]]))){
            fn(-1,'ID不正确')
            console.log(typeof obj[queryAllFilter[0]])
            return
        }
        var querySQL = "select count(*) FROM "+dataTableName +" WHERE roleId="+obj[queryAllFilter[0]];
    }else{  //其它用模糊查询
        var filterKey=[]
        for(var i in queryAllFilter){
            if(like){
                filterKey.push(queryAllFilter[i]+" = "+"'"+obj[queryAllFilter[i]]+"'")
            }else{
                filterKey.push(queryAllFilter[i]+" like "+"'"+obj[queryAllFilter[i]]+"%"+"'")
            }

        }
        var querySQL = "select count(*) FROM "+dataTableName +" WHERE "+filterKey.join(' and ');
    }

    pool.getConnection(function (err, connection) {
        console.log(querySQL)
        if (err) {
            console.log("数据库连接失败");
            return
        }
        connection.query(querySQL, function (err, result) {
            if (err) {
                console.log(err)
                console.log("数据查询失败")
                fn(-1,'更新失败')
                // throw err
            } else {
                console.log(result[0]['count(*)'])
                // return
                fn(0,result[0]['count(*)'])
                connection.release();
            }
        })
    })
}
/*获取最插入的ID*/
function getLastId(connection,fn) {
    var deleteSQL = "select last_insert_id() ";
    connection.query(deleteSQL, function (err, result) {
        if (err) {
            console.log(err)
            console.log("获取最新一条的插入数据失败")
            // throw err
        } else {
            fn(0,{
                roleId:result[0]['last_insert_id()']
            })
   /*         console.log('最新的ID')
            console.log(result[0]['last_insert_id()'])
            fn(0,result)*/
            // console.log(result[0][RowDataPacker.last_insert_id()])
        }
        //回收pool
        connection.release();
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