require('dotenv').config();

// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var session = require('express-session');

var apiPath = process.env.API_PATH + '/' + process.env.API_VERSION;
var util = require('./util');
var baseMiddleware = require('./middleware/base');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// 中间件
app.all('*', function (req, res, next) {
    // 设置cors
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');  // 允许发送Cookie数据
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (util.isNotProdEnv()) {
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// 解析cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 解析body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(baseMiddleware.reply);

// 路由
app.use(apiPath + '/', indexRouter);
app.use(apiPath + '/backend', adminRouter);

// 打印路由
if (util.isNotProdEnv()) {
    util.expressListRoutes({}, 'ROOT:', indexRouter);
    util.expressListRoutes({prefix: '/admin'}, 'ADMIN:', adminRouter);
}

// 404处理
app.use(baseMiddleware.notFound);
// 错误处理
app.use(baseMiddleware.error);

module.exports = app;
