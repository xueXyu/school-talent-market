'use strict';

// auth中间件
module.exports = {
    // 要求用户登录
    login: (req, res, next) => {
        // 查询或创建session时无需检测登录
        if (req.session.user && req.session.user.id && req.session.user.type) {
            req.user = req.session.user; // 将用户信息添加到request对象
            next();
        } else {
            next({message: '请先登录！', status: 200});
        }
    },
};
