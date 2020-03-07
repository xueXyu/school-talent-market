'use strict';

const Joi = require('@hapi/joi');
const credential = require('credential');
const pwd = credential();
const Promise = require('bluebird');

const BaseController = require('./base');

class SessionController extends BaseController {
    /**
     * check session
     */
    index(req, res) {
        res.reply(req.session.user ? [req.session.user] : []);
    }

    /**
     * create session(login)登录
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

        if (value.usertype == 'user') {
            const result = this.models['User'].findOne({
                where: {user_account: value.username}
            }).then((user) => {
                if (user) {
                    return pwd.verify(user.user_password, value.password).then((pwdres) => {
                        if (pwdres) {
                            req.session.user = {
                                id: user.id,
                                type: value.usertype
                            };
                            return user;
                        } else {
                            req.session.destroy();
                            res.replyCannot('用户名或密码错误！');
                        }
                    });
                } else {
                    res.replyCannot('用户不存在！');
                }
            });

            console.log(result);
            res.reply(result);
        } else if (value.usertype == 'company') {
            const result = this.models['Company'].findOne({
                where: {company_account: value.username}
            }).then((user) => {
                if (user) {
                    return pwd.verify(user.company_password, value.password).then((pwdres) => {
                        if (pwdres) {
                            req.session.user = {
                                id: user.id,
                                type: value.usertype
                            };
                            return user;
                        } else {
                            req.session.destroy();
                            res.replyCannot('用户名或密码错误！');
                        }
                    });
                } else {
                    res.replyCannot('用户不存在！');
                }
            });

            res.reply(result);
        }
    }

    /**
     * delete session(logout)
     */
    destroy(req, res) {
        req.session.destroy();
        return res.reply('退出成功！');
    }

    // 更新用户密码
    updatePassword(req, res) {
        const rules = {
            oldPassword: joi.string().min(6).required(),
            newPassword: joi.string().min(6).required(),
            newPasswordRepeat: joi.string().min(6).required()
        };
        const {error, value} = joi.validate(req.body, rules);
        if (error) {
            return res.replyError(error);
        }
        if (value.newPassword !== value.newPasswordRepeat) {
            return res.replyError('两个新密码不一致！');
        }

        const AdminUser = this.models['AdminUser'];
        const userId = req.user.id;
        const result = AdminUser.findByPk(userId, {attributes: {include: ['password']}}).then((user) => {
            if (user) {
                return pw.verify(user.password, value.oldPassword).then((result) => {
                    if (result) {
                        return pw.hash(value.newPassword).then((hash) => {
                            return user.update({
                                password: hash
                            }).then(() => {
                            });
                        });
                    } else {
                        return Promise.reject('旧密码错误！');
                    }
                });
            } else {
                return Promise.reject('用户不存在！');
            }
        });
        res.reply(result);
    }
}

module.exports = new SessionController();
