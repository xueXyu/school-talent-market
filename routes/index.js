var express = require('express');
var router = express.Router();
var models = require('../models');
// const util = require('../util');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
    res.reply('Hello!');
});

router.get('/json', function(req, res, next) {

    return models['Admin'].findAll({
    }).then(function(result){
        // res.send(result);
        res.json(result)
    }).catch(function(error){
        console.log("发生错误：" + error);
    });

});

//
// util.restRoute('/users', router, userController);
// util.restRoute('/roles', router, roleController);
// util.restRoute('/permissions', router, permissionController);
//
// util.buildRoute([
//     {path: '/users/:id/roles', method: 'get', target: 'fetchRoles'},
//     {path: '/users/:id/roles', method: 'put', target: 'updateRoles'}
// ], router, userController);
//
// util.buildRoute([
//     {path: '/roles/:id/permissions', method: 'get', target: 'fetchPermissions'},
//     {path: '/roles/:id/permissions', method: 'put', target: 'updatePermissions'}
// ], router, roleController);
//
// // 查看/创建session无需登录，登出与更新密码需要
// util.buildRoute([
//     { path: '/sessions', method: 'get', target: 'index' },
//     { path: '/sessions', method: 'post', target: 'create' },
//     { path: '/sessions', method: 'delete', target: 'destroy', middlewares: [authMiddleware.login] },
//     { path: '/sessions/update-password', method: 'post', target: 'updatePassword', middlewares: [authMiddleware.login] }
// ], router, sessionController);

module.exports = router;
