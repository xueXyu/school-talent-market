require('dotenv').config();

// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var apiPath = process.env.API_PATH + '/' + process.env.API_VERSION;
var util = require('./util');
var baseMiddleware = require('./middleware/base');
var baseRouter = require('./routes/base');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var uploadRouter = require('./routes/upload');


var app = express();

// 中间件
app.all('*', function (req, res, next) {
    // 设置cors
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json;charset=utf-8");
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

// 将uploads文件夹托管为静态文件
app.use(apiPath + '/uploads', express.static(__dirname + '/uploads'));

app.use(session({
    name: 'sessionid',
    secret: 'school-talent-market',
    resave: false,
    saveUninitialized: true,
}));

// 路由
app.use(apiPath + '/', indexRouter);
app.use(apiPath + '/base', baseRouter);
app.use(apiPath + '/backend', adminRouter);
app.use(apiPath + '/upload', uploadRouter);

// 打印路由
if (util.isNotProdEnv()) {
    util.expressListRoutes({prefix: '/'}, 'web:', indexRouter);
    util.expressListRoutes({prefix: '/base'}, 'base:', baseRouter);
    util.expressListRoutes({prefix: '/backend'}, 'backend:', adminRouter);
    util.expressListRoutes({prefix: '/upload'}, 'upload:', uploadRouter);
}

// 404处理
app.use(baseMiddleware.notFound);
// 错误处理
app.use(baseMiddleware.error);

module.exports = app;
