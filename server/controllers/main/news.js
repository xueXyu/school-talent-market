'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class NewsController extends RestController {
    constructor() {
        super('News');
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
     * 创建对象
     */
    create(req, res) {
        let data = req.body;
        if (this.restRules.create) {
            const validate = joi.validate(req.body, this.restRules.create);
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
            const validate = joi.validate(req.body, this.restRules.update);
            if (validate.error) {
                return res.replyError(validate.error);
            }
            data = validate.value;
        }
        res.reply(this.model.update(data, {where: {id: req.params.id}}));
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

    /**
     * 统计数据
     */
    homeStatistics(req, res) {
        const CompanyJob = this.models['CompanyJob'];
        const User = this.models['User'];
        const UserResume = this.models['UserResume'];
        const Company = this.models['Company'];

        var count_job = new Promise(function (resolve, reject) {
            CompanyJob.count().then((result) => {
                resolve(result);
            });
        });
        var count_user = new Promise(function (resolve, reject) {
            User.count().then((result) => {
                resolve(result);
            });
        });
        var count_resume = new Promise(function (resolve, reject) {
            UserResume.count().then((result) => {
                resolve(result);
            });
        });
        var count_company = new Promise(function (resolve, reject) {
            Company.count().then((result) => {
                resolve(result);
            });
        });

        Promise.all([count_job, count_user, count_resume, count_company])
            .then(function (results) {
                res.json({
                    code: 0,
                    message: 'success',
                    data: {
                        count_job: results[0] * 100,
                        count_user: results[1] * 100,
                        count_resume: results[2] * 100,
                        count_company: results[3] * 100,
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.json({
                    code: 1,
                    message: error,
                    data: '查询出错'
                });
            });
    }

    /**
     * 用户反馈
     */
    homeFeedback(req, res) {
        var result = {
            "count": 3,
            "rows": [
                {
                    name: '王二妞',
                    title: '前端设计师',
                    feedback: '哈哈哈，感谢这个网站，为我找到了合适的工作，希望你们越办越好，为更多的人提供方便。',
                    head: 'static/images/authors/author-1.jpg',
                }, {
                    name: '李铁蛋',
                    title: '销售经理',
                    feedback: '感谢~找到了好久的工作，都没有结果，在这里很快就找到了一个干销售的工作，最开始还不太明白，后来就越赚越多，哈哈哈，简直是走上人生巅峰。',
                    head: 'static/images/authors/author-2.jpg',
                }, {
                    name: '张全蛋',
                    title: '后端工程师',
                    feedback: '苦逼程序猿，天天敲代码，不过还好在这个网站找到了一个大公司收留，哈哈哈，希望网站越办越好，墙裂推荐！',
                    head: 'static/images/authors/author-3.jpg',
                }
            ]
        };

        res.json({
            code: 0,
            message: 'success',
            data: result
        });
    }
}

module.exports = new NewsController();
