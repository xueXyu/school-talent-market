'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class UserResumeController extends RestController {
    constructor() {
        super('UserResume');
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
                model: this.models['User'],
                as: 'user',
                attributes: ['id', 'created_at', 'user_name', 'user_gender', 'user_age', 'user_phone', 'user_img']
            }]
        };
        res.reply(this.model.findOne(data));
    }

    /**
     * 创建对象
     */
    create(req, res) {
        const rules = Joi.object({
            user_id: Joi.number().integer().min(1).required(),
            resume_name: Joi.string().min(2).max(32).required(),
            resume_email: Joi.string().email().min(2).max(100).required(),
            resume_education: Joi.string().valid('初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士').required(),
            resume_working_years: Joi.string().valid('零经验', '一年', '两年', '三年', '四年', '五年', '五年以上').required(),
            resume_job_intension: Joi.string().required(),
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
            resume_name: Joi.string().min(2).max(32).required(),
            resume_email: Joi.string().email().min(2).max(100).required(),
            resume_education: Joi.string().valid('初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士').required(),
            resume_working_years: Joi.string().valid('零经验', '一年', '两年', '三年', '四年', '五年', '五年以上').required(),
            resume_job_intension: Joi.string().required(),
        });
        const {error, value} = rules.validate(req.body);
        if (error) {
            return res.replyError(error);
        }

        res.reply(this.model.update(value, {where: {id: req.params.id}}));
    }
}

module.exports = new UserResumeController();
