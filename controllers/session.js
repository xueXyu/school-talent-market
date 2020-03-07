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
     * create session(login)
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
                            return {
                                'id': user.id,
                                'created_at': user.created_at,
                                'user_account': user.user_account,
                                'user_name': user.user_name,
                                'user_gender': user.user_gender,
                                'user_age': user.user_age,
                                'user_phone': user.user_phone,
                                'user_img': user.user_img,
                            };
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
                            return {
                                'id': user.id,
                                'created_at': user.created_at,
                                'company_account': user.company_account,
                                'company_name': user.company_name,
                                'company_phone': user.company_phone,
                                'company_contacts': user.company_contacts,
                                'company_create': user.company_create,
                                'company_size': user.company_size,
                                'company_address': user.company_address,
                                'company_site': user.company_site,
                                'company_detail': user.company_detail,
                            };
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
