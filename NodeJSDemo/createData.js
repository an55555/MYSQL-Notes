/**
 * Created by Administrator on 2017/8/17.
 */
var fs = require("fs");

// 生成数据
var i=0,txt="";
for(i;i<1000;i++){
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