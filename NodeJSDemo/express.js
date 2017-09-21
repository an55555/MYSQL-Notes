/**
 * Created by Administrator on 2017/7/5.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.use(bodyParser.urlencoded({ extended: false}));
//  主页输出 "Hello World"
/*app.get('/', function (req, res) {
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})*/


app.use('/', function (req, res, next) {
    console.log(req.body);
    for(var i in req.body){
        // console.log(req.body[i])
        if(typeof req.body[i]=='string'){
            req.body[i]=req.body[i].replace(/(^\s*)|(\s*$)/,'')
        }

    }
    next();
})

var roles = require('./Controller/rolesC')
app.use('/roles',roles)

var organization = require('./Controller/organizationC')
app.use('/organization',organization)

var user = require('./Controller/userC')
app.use('/user',user)

var birds = require('./Controller/birds')
app.use('/birds',birds)

var files = require('./Controller/filesC')
app.use('/file',files)


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})