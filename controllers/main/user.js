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
            // 6 - 30 位 字母数字组合密码
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            // 只有：用户，公司
            usertype: Joi.string().valid('user', 'company').required(),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }
        var theModel, findWhere;
        if (value.usertype == 'user') {
            theModel = this.models['User'];
            findWhere = {user_account: value.username};
        } else if (value.usertype == 'company') {
            theModel = this.models['Company'];
            findWhere = {company_account: value.username};
        }

        const result = theModel.findOne({
            where: findWhere
        }).then((user) => {
            if (!user) {
                return pwd.hash(value.password).then((hash) => {
                    var inster;
                    if (value.usertype == 'user') {
                        inster = {
                            user_account: value.username,
                            user_password: hash
                        }
                    } else if (value.usertype == 'company') {
                        inster = {
                            company_account: value.username,
                            company_password: hash
                        }
                    }

                    return this.sequelize.transaction((t) => {
                        return theModel.create(inster, {transaction: t}).then((user) => {
                            const userData = {
                                id: user.id,
                                type: value.usertype
                            };
                            req.session.user = userData;
                            return user;
                        });
                    });
                });
            } else {
                res.replyCannot('用户已存在！');
            }
        });


        res.reply(result);
    }
}

module.exports = new UserController();
