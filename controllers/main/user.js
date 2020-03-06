'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const credential = require('credential');
const pwd = credential();
const RestController = require('../rest');

class UserController extends RestController {
    constructor() {
        super('User');
    }

    /**
     * 用户和公司注册
     */
    create(req, res) {
        const rules = Joi.object({
            // 3 - 30 个 数字、字符
            username: Joi.string().alphanum().min(3).max(30).required(),
            // 3 - 30 位 字母数字组合密码
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            // 只有：用户，公司
            usertype: Joi.string().valid('user', 'company').required(),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        const result = pwd.hash(value.password).then((hash)=>{
            var theUser = this.models['User'];
            value.user_account = value.username;
            value.user_password = hash;
            if (value.usertype == 'company') {
                var theUser = this.models['Company'];
                value.company_account = value.username;
                value.company_password = hash;
            }
            const type = value.usertype;
            delete value.usertype;

            return this.sequelize.transaction((t) => {
                return theUser.create(value, {transaction: t}).then((user)=>{
                    const userData = {
                        id: user.id,
                        type: type
                    };
                    req.session.user = userData;
                    return user;
                });
            });
        });

        res.reply(result);
    }

    /**
     * 更新对象
     */
    update(req, res) {
        res.reply('update');
    }

    /**
     * 删除单个对象
     */
    destroy(req, res) {
        res.reply('destroy');
    }
}

module.exports = new UserController();
