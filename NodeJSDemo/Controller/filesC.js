/**
 * Created by Administrator on 2017/8/15.
 */
var express = require('express')
var router = express.Router()
var multiparty=require('multiparty');
var fs=require('fs');

// define the about route
var filePath='./public/files/';
router.post('/uploading', function (req, res,next) {
    //生成multiparty对象，并配置上传目标路径
    fs.exists(filePath,function(exists){
        if(exists){
            console.log("文件存在")
        }
        if(!exists){
            console.log("文件不存在")
            fs.mkdir(filePath,function(err){
                if (err) {
                    return console.error(err);
                }
                console.log("目录创建成功。");
                upLoadFile()
            });
        }
    })
    console.log(134)
    function upLoadFile() {
        var form = new multiparty.Form({uploadDir: filePath});
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            if(err){
                console.log('parse error: ' + err);
            } else {
                //重命名为真实文件名
                var oldloadedPath = files.avatar[0].path;  //获取旧的文件路径+文件名
                var newloadedPath = filePath+files.avatar[0].originalFilename;  //新的文件路径+文件名
                fs.rename(oldloadedPath, newloadedPath, function(err) {
                    if(err){
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                    }
                });
            }

            res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
            res.write('received upload:\n\n');
        });
    }

})
router.get('/downloadSingle',function(req, res, next){
    var path =filePath+'QQ图片20170724114723.png';
    res.download(path);
});
module.exports = router