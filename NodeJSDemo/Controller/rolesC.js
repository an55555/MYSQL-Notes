/**
 * Created by Administrator on 2017/8/15.
 */
var express = require('express')
var router = express.Router()
var multiparty = require('multiparty');
var UserDao=require('../Dao/rolesDao')
userDao=new UserDao();
//  POST 请求
router.post('/add', function (req, res) {
    userDao.insert(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})
router.post('/delete', function (req, res) {
    userDao.delete(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})
router.post('/update', function (req, res) {
    userDao.update(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})

router.post('/query', function (req, res) {
    /*    var form = new multiparty.Form();
     form.parse(req, function (err, fields, files) {
     console.log(fields);
     });*/
    // console.log(req.params)
    console.log(req.body)
    /*    var str="";
     req.on("data",function (dt) {
     str+=dt
     })
     req.on("end",function(){
     console.log(str.name);
     })*/
    userDao.query(req.body,function (err,result,count) {
        res.send(
            {
                errcode:err,
                data:result,
                dataTotal:count?count:'',
                msg:!err?'success':'error'
            }
        );
    })
    /*    userDao.query(req.body)
     var response = {
     response:"success"
     };*/
    // res.send(userDao.query(req.body));
})

module.exports = router