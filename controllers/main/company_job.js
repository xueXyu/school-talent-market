'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class CompanyJobController extends RestController {
    constructor() {
        super('CompanyJob');
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
                model: this.models['Company'],
                as: 'company',
                attributes: ['id', 'created_at', 'company_name', 'company_phone', 'company_contacts', 'company_create', 'company_size', 'company_address', 'company_site', 'company_detail', 'company_img']
            }]
        };
        res.reply(this.model.findOne(data));
    }

    /**
     * 创建对象
     */
    create(req, res) {
        const rules = Joi.object({
            company_id: Joi.number().integer().min(1).required(),
            job_name: Joi.string().min(2).max(32).required(),
            job_salary: Joi.string().min(2).max(32).required(),
            job_gender: Joi.string().valid('无', '男', '女').required(),
            job_way: Joi.string().valid('全职', '兼职', '实习').required(),
            job_description: Joi.string().required(),

        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        res.reply(this.model.create(value));
    }

    /**
     * 更新对象
     */
    update(req, res) {
        const rules = Joi.object({
            job_name: Joi.string().min(2).max(32).required(),
            job_salary: Joi.string().min(2).max(32).required(),
            job_gender: Joi.string().valid('无', '男', '女').required(),
            job_way: Joi.string().valid('全职', '兼职', '实习').required(),
            job_description: Joi.string().required(),

        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        res.reply(this.model.update(value, {where: {id: req.params.id}}));
    }
}

module.exports = new CompanyJobController();
