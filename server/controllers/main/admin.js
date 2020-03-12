'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');
const credential = require('credential');
const pwd = credential();

class AdminController extends RestController {
    constructor() {
        super('Admin');
    }

    /**
     * 用户和公司注册
     */
    create(req, res) {
        const rules = Joi.object({
            // 3 - 30 个 数字字母
            username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            // 6 - 30 位 字母数字组合密码
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyCannot(error);
        }

        const result = this.model.findOne({
            where: {admin_account: value.username}
        }).then((admin) => {
            if (!admin) {
                return pwd.hash(value.password).then((hash) => {
                    return this.sequelize.transaction((t) => {
                        return this.model.create({
                            admin_account: value.username,
                            admin_password: hash
                        }, {transaction: t}).then((admin) => {
                            const adminData = {
                                id: admin.id
                            };
                            req.session.admin = adminData;
                            return admin;
                        });
                    });
                });
            } else {
                res.replyCannot('管理员账号已存在！');
            }
        });


        res.reply(result);
    }

    /**
     * 登录
     */
    login(req, res) {
        const rules = Joi.object({
            // 3 - 30 个 数字字母
            username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            // 6 - 30 位 字母数字组合密码
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        const result = this.model.findOne({
            where: {admin_account: value.username}
        }).then((admin) => {
            if (admin) {
                return pwd.verify(admin.admin_password, value.password).then((pwdres) => {
                    if (pwdres) {
                        req.session.admin = {
                            id: admin.id
                        };
                        return admin;
                    } else {
                        req.session.destroy();
                        res.replyCannot('管理员账号或密码错误！');
                    }
                });
            } else {
                res.replyCannot('管理员账号不存在！');
            }
        });

        res.reply(result);
    }

    /**
     * 更新对象
     */
    updatePassword(req, res) {
        res.reply('update');
    }
}

module.exports = new AdminController();