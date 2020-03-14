var express = require('express');
var router = express.Router();
var util = require('../util');

var adminController = require('../controllers/main/admin');

var userController = require('../controllers/main/user');
var userResumeController = require('../controllers/main/user_resume');
var userLikeJobController = require('../controllers/main/user_like_job');

var jobResumeAssController = require('../controllers/main/job_resume_associated');

var companyController = require('../controllers/main/company');
var companyJobController = require('../controllers/main/company_job');

var newsController = require('../controllers/main/news');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.end('Hello! this is web api');
});

// 使用rest的CURD
// util.restRoute('/news', router, newsController);
// util.restRoute('/user', router, userController);
util.restRoute('/user-resume', router, userResumeController);
util.restRoute('/user-like-job', router, userLikeJobController);
// util.restRoute('/company', router, companyController);
// util.restRoute('/company-job', router, companyJobController);
util.restRoute('/job-to-resume', router, jobResumeAssController);

util.buildRoute([
    {path: '/user/create', method: 'post', target: 'createUser'},
    {path: '/user', method: 'get', target: 'index'},
    {path: '/user/:id', method: 'get', target: 'show'},
    {path: '/user', method: 'post', target: 'create'},
    {path: '/user/:id', method: 'put', target: 'update'},
    {path: '/user/:id', method: 'delete', target: 'destroy'},
], router, userController);

util.buildRoute([
    {path: '/news/daily-increase', method: 'get', target: 'dailyIncrease'},
    {path: '/news/home-statistics', method: 'get', target: 'homeStatistics'},
    {path: '/news/home-feedback', method: 'get', target: 'homeFeedback'},
    {path: '/news', method: 'get', target: 'index'},
    {path: '/news/:id', method: 'get', target: 'show'},
    {path: '/news', method: 'post', target: 'create'},
    {path: '/news/:id', method: 'put', target: 'update'},
    {path: '/news/:id', method: 'delete', target: 'destroy'},
], router, newsController);

util.buildRoute([
    {path: '/company/search', method: 'post', target: 'search'},
    {path: '/company', method: 'get', target: 'index'},
    {path: '/company/:id', method: 'get', target: 'show'},
    {path: '/company', method: 'post', target: 'create'},
    {path: '/company/:id', method: 'put', target: 'update'},
    {path: '/company/:id', method: 'delete', target: 'destroy'},
], router, companyController);

util.buildRoute([
    {path: '/company-job/search', method: 'post', target: 'search'},
    {path: '/company-job', method: 'get', target: 'index'},
    {path: '/company-job/:id', method: 'get', target: 'show'},
    {path: '/company-job', method: 'post', target: 'create'},
    {path: '/company-job/:id', method: 'put', target: 'update'},
    {path: '/company-job/:id', method: 'delete', target: 'destroy'},
], router, companyJobController);

// 自定义指定到方法，也可以重定义CURD
util.buildRoute([
    {path: '/admin/login', method: 'post', target: 'login'},
    {path: '/admin/info', method: 'get', target: 'info'},
    {path: '/admin/logout', method: 'post', target: 'logout'},

    {path: '/admin', method: 'get', target: 'index'},
    {path: '/admin/:id', method: 'get', target: 'show'},
    {path: '/admin', method: 'post', target: 'create'},
    {path: '/admin/:id', method: 'put', target: 'updatePassword'},
    {path: '/admin/:id', method: 'delete', target: 'destroy'},
], router, adminController);

module.exports = router;
