'use strict';

// 基础中间件

const _ = require('lodash');

// 请求返回中间件，定义接口返回数据或异常
// 成功:
// {
//   code: 0,
//   message: 'success',
//   data: {}/[{}]
// }
// 异常:
// {
//   code: 1,
//   message: 'reason'
// }
function reply(req, res, next) {
    function _reply(data) {
        if (data && typeof data.then === 'function') {
            _replyPromise(data);
        } else {
            _replyObj(data);
        }
    }

    function _replyPromise(promise) {
        promise.then((result) => {
            _replyObj(result);
        }).catch((err) => {
            _replyError(err);
        });
    }

    function _replyObj(data) {
        data = data || {};
        // 不返回，updated_at，deleted_at，user_password，company_password等字段数据
        var disableList = [
            'updated_at',
            'deleted_at',
            'user_password',
            'company_password',
            'admin_password'
        ];

        // 去除不可显示字段
        var result = null;
        if (data.rows && data.count) {
            // console.log('多条数据', data);
            result = {
                count: data.count,
                rows: [],
            };
            data.rows.forEach((currentValue, currentIndex) => {
                result.rows.push(_.omit(currentValue.dataValues, disableList));
            });
        } else {
            // console.log('单条数据', data);
            result = _.omit(data.dataValues, disableList);
        }

        res.json({
            code: 0,
            message: 'success',
            data: result
        });
    }

    function _replyError(err) {
        err = err || {};

        console.error('Error', err);

        let message = err.message || err;
        let status = err.status || 200;

        // process joi error
        if (err.details && err.details.length) {
            message = _.reduce(err.details, (result, detail) => {
                if (result) {
                    result += '; ';
                }
                return result + detail.message;
            }, '');
        } else if (err.errors && err.errors.length) {
            message = err.errors[0].message;
        }

        res.status(status).json({
            code: err.code || 1,
            message: message || err || 'Unknown error'
        });
    }

    function _replyCannot(err) {
        res.status(200).json({
            code: 1,
            message: err || 'Unknown error'
        });
    }

    res.reply = _reply;
    res.replyError = _replyError;
    res.replyCannot = _replyCannot;

    next();
}

// 404
function notFound(req, res) {
    res.status(404).end('Not found!');
}

// 通用错误处理
function error(err, req, res, next) {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(err.status || 500).json({code: 1, message: 'Internal error!'});
    } else {
        res.status(err.status || 500);
        res.json({
            code: 1,
            message: err.message
        });
    }
}

module.exports = {
    reply: reply,
    notFound: notFound,
    error: error
};
