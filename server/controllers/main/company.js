'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class CompanyController extends RestController {
    constructor() {
        super('Company');
    }

    /**
     * 返回搜索对象
     */
    search(req, res) {
        const rules = Joi.object({
            company_name: Joi.string(),
            company_address: Joi.string(),
            company_size: Joi.string().valid('0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        const data = {};
        if (value && !_.isEmpty(value)) {
            var where = {};
            _.forEach(value, function (val, key) {
                where[key] = {[Op.like]: '%' + val + '%'};
            });
            data.where = where;
        }

        data.include = [{
            model: this.models['CompanyJob'],
            as: 'jobs',
            attributes: ['id', 'created_at', 'job_name', 'job_salary', 'job_gender', 'job_way']
        }];
        data.distinct = true;

        res.reply(this.model.findAndCountAll(data));
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

        data.include = [{
            model: this.models['CompanyJob'],
            as: 'jobs',
            attributes: ['id', 'created_at', 'job_name', 'job_salary', 'job_gender', 'job_way'
            ]
        }];
        data.distinct = true;

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
                model: this.models['CompanyJob'],
                as: 'jobs',
                attributes: ['id', 'created_at', 'job_name', 'job_salary', 'job_gender', 'job_way'
                ]
            }]
        };
        res.reply(this.model.findOne(data));
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
}

module.exports = new CompanyController();
