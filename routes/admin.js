var express = require('express');
var router = express.Router();
var util = require('../util');
var adminController = require('../controllers/main/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.reply('this is admin api');
});

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

util.buildRoute([
    { path: '/admin', method: 'get', target: 'index' },
    { path: '/admin/:id', method: 'get', target: 'show' },
    { path: '/admin', method: 'post', target: 'create' },
    { path: '/admin', method: 'delete', target: 'destroy'},
    { path: '/admin-update-password', method: 'post', target: 'updatePassword'}
], router, adminController);

module.exports = router;
