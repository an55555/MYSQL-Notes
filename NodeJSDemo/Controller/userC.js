/**
 * Created by Administrator on 2017/8/15.
 */
var express = require('express')
var router = express.Router()
var multiparty = require('multiparty');
var ModelDao=require('../Dao/userDao')
modelDao=new ModelDao();
//  POST 请求
router.post('/add', function (req, res) {
    modelDao.insert(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})
router.post('/delete', function (req, res) {
    modelDao.delete(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})
router.post('/update', function (req, res) {
    modelDao.update(req.body,function (err,result) {
        var response = {
            errcode:err,
            response:!err?"success":"error",
            data:result
        };
        res.send(response);
    })
})

router.post('/query', function (req, res) {
    modelDao.query(req.body,function (err,result,count) {
        res.send(
            {
                errcode:err,
                data:result,
                dataTotal:count?count:'',
                msg:!err?'success':'error'
            }
        );
    })

})

module.exports = router