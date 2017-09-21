/**
 * Created by Administrator on 2017/2/6.
 */


var pool=require('../config/dataSQl')
/*实体*/
var modelEtity = ['username','password', 'name','tel','organization','role','isValid']  //获取的字段
var queryEtity=['Id','username','password', 'name','tel','organization','role','isValid']

var dataTableName='users'
// var dataTableName='testdatas'
function modelDao() {
        this.insert = addModel,
        this.delete = deleteModel,
        this.update = updateModel,
        this.query = queryModel
}

/*实现插入语句*/
function addModel(obj,fn) {
    var unit = []   //字段对应的值
    var replaceUnit = []  //添加点位符
    for (i in modelEtity) {
        if(!obj[modelEtity[i]]){
            fn(-2,modelEtity[i]+"不能为空");
            return
        }
        unit.push(obj[modelEtity[i]])
        replaceUnit.push('?')
    }
    var insertSQL = "insert into "+dataTableName+"(" + modelEtity.join(',') + ",createAt,updateAt) values("+replaceUnit.join()+",now(),now())";
    var doSql=function (err,count) {
        if(err){fn(err,count);return}
        if(count){
            fn(-1,"用户已存在")
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
    queryModelCount(['username'],obj,doSql,true) //最后一参数通知查询数量的是否使用唯一查询

}

/*实现删除语句*/
function deleteModel(obj,fn) {
    var regex=/\w+/;
    var dele=obj.Id.replace(regex,'?')
    var deleteSQL = "DELETE FROM "+dataTableName+" WHERE Id in("+dele+")";

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
            connection.query(deleteSQL, obj.Id, function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("数据删除失败")
                    // throw err
                } else {
                    console.log(result)
                    fn(0,"删除成功")
                }
                //回收pool
                connection.release();
            })
        })
    }

    queryModelCount(['Id'],obj,doSql)

}
/*实现更改语句*/
function updateModel(obj,fn) {
    console.log(Date.now())
    var unit = []
    for (i in modelEtity) {
        if(!obj[modelEtity[i]]){
            fn(-2,modelEtity[i]+"不能为空");
            return
        }
        if(modelEtity[i]!='username'){
            unit.push(obj[modelEtity[i]])
        }

    }
    // unit.push()
    // unit.push(Date.now())
    var regex=/(?=,)|$/g;
    var upArr=[];
    for(var i in modelEtity){
        if(modelEtity[i]!='username'){
            upArr.push(modelEtity[i])
        }
    }
    var upd=upArr.join().replace(regex,'=?')
    var updateSQL = "UPDATE "+dataTableName+" set " + upd + ",updateAt=now() where Id="+obj.Id;
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
    queryModelCount(['Id'],obj,doSql)

}
/*查询语句实现*/
function queryModel(obj,fn) {
    var doSql=function (err,count) {

        /*如果查找数量时就出错了就不用往下执行了*/
        if(err){fn(err,count);return}

        var limitstStart=obj.limitStart?obj.limitStart:0;  //获取开始页
        var limitNum=obj.limitNum?obj.limitNum:count;  //获取条数
        if(!obj.organization){
            fn(-1,"组名Id错误");
            return
        }
        // var where=" WHERE organization = "+"'"+obj.organization+"'"
        // var where=" WHERE organization like "+"'%"+obj.organization+"%'"
        var like=[]
        var likeArr=""
        if(obj.username||obj.name||obj.role2){
            likeArr+="and ("
            if(obj.username){
                like.push(" username like "+"'"+obj.username+"%'")
            }
            if(obj.name){
                like.push(" name like "+"'"+obj.name+"%'")
            }
            if(obj.role2){
                like.push("( role like '2,%' or  role like '%,2' or  role like '%,2,%' )")
            }
            likeArr+=like.join(' and ')+")"
            // likeArr+=")"
        }
        // var likeArr=" and ("+like.join(' and ')+")"

        console.log(like)

        var where=" WHERE (organization like " + "'"+obj.organization+",%'"+"or organization like " + "'%,"+obj.organization+"'"+"or organization like " + "'%,"+obj.organization+",%')"+likeArr
        var querySQL = "select " +queryEtity.join()+" FROM "+dataTableName +where+" limit "+limitstStart+","+limitNum ;
        // var querySQL2 = "select Id in ("+querySQL +") where username='ljz1'" ;
        console.log(querySQL)
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
                    fn(0,result,count)
                }

            })
        })
    }
    // doSql(0,'')
    var queryAllFilter=obj.parentId?['organization']:[]
    queryModelCount(queryAllFilter,obj,doSql)
}
/*查询总量*/
function queryModelCount(queryAllFilter,obj, fn,like) {
    if(!queryAllFilter.length){
        var querySQL = "select count(*) FROM "+dataTableName;
    }else if(queryAllFilter[0]=='Id'){  //如果查的是ID 具体查询
        if((!(/^\d+$/).test(obj[queryAllFilter[0]]))){
            fn(-1,'ID不正确')
            console.log(typeof obj[queryAllFilter[0]])
            return
        }
        var querySQL = "select count(*) FROM "+dataTableName +" WHERE Id="+obj[queryAllFilter[0]];
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
                Id:result[0]['last_insert_id()']
            })
        }
        //回收pool
        connection.release();
    })

}
module.exports = modelDao;