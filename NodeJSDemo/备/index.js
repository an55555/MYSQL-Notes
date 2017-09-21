/**
 * Created by Administrator on 2017/7/4.
 */
var server = require("./server2");
var router = require("./router");

server.start(router.route);