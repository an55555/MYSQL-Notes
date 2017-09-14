### load data infile  --将文件里的数据导入到数据库中

现在有表 `testdatas`

表中字段：roleId、roleName、rolePermission、createAt、isDefault、updateAt

```json
//load.txt
"AA","AAA","1"
"BB","BBB","2"
"CC","CCC","1"
```

我们将load.txt的内容导入到表testdatas表中

执行mysql语句

```javascript
mysql>load data infile "./load.txt" replace  into table testdatas fields terminated by ','  lines terminated by '\n' (roleName, rolePermission, isDefault);
```

#### 参数说明：

**local:** 表示从本地读文件。以上load.txt的路径为 mysql的安装路径/data文件下

**replace：** 当主键重复时，新行将代替旧行。 还可选 ignore表示忽略

**fields','：** 开始定义分隔规则

**terminated by ','：** 一行的字段值以‘，’做为分隔

**lines terminated by '\n'：** 每条数据与 换行 做为分隔

****

其它参数需要时再了解吧

### 利用load data infile 一次性向数据库表中添加大量测试数据

**第一步：使用nodejs本地生成数据文件**

```javascript
var fs = require("fs");

// 生成数据
var i=0,txt="";
for(i;i<1000000;i++){
    txt+="roleName"+i
        +",rolePermission1"+i
        +",createAt1"+i
        +",isDefault"+i
        +",updateAt"+i
        +'\n'
}

console.log("准备写入文件");
fs.writeFile('input.txt', txt,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
    fs.readFile('input.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
    });
});
```

**第二步：导入数据**

```javascript
mysql>load data infile "./load.txt" replace  into table testdatas fields terminated by ','  lines terminated by '\n' (roleName, rolePermission, createAt,isDefault,updateAt);
```
这样说生成了100万条测试数据了

**附：** 清空数据表的命令：

truncate table 表名;-- 清空全部数据，不写日志，不可恢复，速度极快
 
delete from 表名-- 清空全部数据，写日志，数据可恢复，速度慢

### 获取刚插入数据的ID值(id为自增属性)

```javascript
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
        }
        //回收pool
        connection.release();
    })

}
```