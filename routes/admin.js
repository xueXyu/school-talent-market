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
    res.end('Hello! this is admin api');
});

// 使用rest的CURD
util.restRoute('/news', router, newsController);
util.restRoute('/user', router, userController);
util.restRoute('/user-resume', router, userResumeController);
util.restRoute('/user-like-job', router, userLikeJobController);
util.restRoute('/company', router, companyController);
util.restRoute('/company-job', router, companyJobController);
util.restRoute('/job-to-resume', router, jobResumeAssController);

// 自定义指定到方法，也可以重定义CURD
util.buildRoute([
    { path: '/admin', method: 'get', target: 'index' },
    { path: '/admin/:id', method: 'get', target: 'show' },
    { path: '/admin', method: 'post', target: 'create' },
    { path: '/admin/:id', method: 'put', target: 'updatePassword' },
    { path: '/admin', method: 'delete', target: 'destroy'},
], router, adminController);

module.exports = router;
