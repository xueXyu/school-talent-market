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
     * 分页返回所有对象
     */
    index(req, res) {
        const params = req.query || {};
        const data = {
            offset: +params.offset || 0,
            limit: +params.limit || 10
        };
        if (params.where && _.isObject(params.where)) {
            data.where = params.where;
        }
        if (params.order && _.isObject(params.order)) {
            data.order = [
                params.order
            ];
        }

        res.reply(this.model.findAndCountAll(data));
    }

    /**
     * 查找单个对象
     */
    show(req, res) {
        if (!req.params || !req.params.id) {
            return res.replyError('missing id parameter');
        }

        const data = {
            where: {id: req.params.id},
            include: [{
                model: this.models['UserResume'],
                as: 'resumes',
                attributes: ['id', 'created_at', 'resume_name', 'resume_email', 'resume_education', 'resume_working_years']
            }]
        };
        res.reply(this.model.findOne(data));
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
            // 只有：用户，公司
            usertype: Joi.string().valid('user', 'company').required(),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyCannot(error);
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

    /**
     * 创建对象
     */
    createUser(req, res) {
        let data = req.body;
        if (this.restRules.create) {
            const validate = Joi.validate(req.body, this.restRules.create);
            if (validate.error) {
                return res.replyError(validate.error);
            }
            data = validate.value;
        }
        res.reply(this.model.create(data));
    }

    /**
     * 更新对象
     */
    update(req, res) {
        if (!req.params || !req.params.id) {
            return res.replyError('missing id parameter');
        }

        let data = req.body;
        if (this.restRules.update) {
            const validate = Joi.validate(req.body, this.restRules.update);
            if (validate.error) {
                return res.replyError(validate.error);
            }
            data = validate.value;
        }

        pwd.hash(data.user_password).then((hash) => {
            data.user_password = hash
            res.reply(this.model.update(data, {where: {id: req.params.id}}));
        });
    }

    /**
     * 删除单个对象
     */
    destroy(req, res) {
        if (!req.params || !req.params.id) {
            return res.replyError('missing id parameter');
        }

        this.model.findByPk(req.params.id).then((obj) => {
            if (obj) {
                res.reply(obj.destroy());
            } else {
                res.replyError(this.modelName + ' not found');
            }
        });
    }
}

module.exports = new UserController();
