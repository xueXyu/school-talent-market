'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class JobResumeAssociatedController extends RestController {
    constructor() {
        super('JobResumeAssociated');
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
        if (params.user_id) {
            data.where = {};
            data.where.user_id = params.user_id;
        }
        if (params.job_id) {
            data.where = data.where || {};
            data.where.job_id = params.job_id;
        }
        if (params.company_id) {
            data.where = data.where || {};
            data.where.company_id = params.company_id;
        }
        if (params.resume_id) {
            data.where = data.where || {};
            data.where.resume_id = params.resume_id;
        }
        if (params.status && (params.status === '申请中' || params.status === '通过' || params.status === '未通过')) {
            data.where = data.where || {};
            data.where.status = params.status;
        }

        data.include = [{
            model: this.models['User'],
            as: 'user',
            attributes: ['id', 'created_at', 'user_name', 'user_gender', 'user_age', 'user_phone', 'user_img']
        }, {
            model: this.models['Company'],
            as: 'company',
            attributes: ['id', 'created_at', 'company_name', 'company_phone', 'company_contacts', 'company_create', 'company_size', 'company_address', 'company_site', 'company_img']
        }, {
            model: this.models['CompanyJob'],
            as: 'jobs',
            attributes: ['id', 'created_at', 'job_name', 'job_salary', 'job_gender', 'job_way']
        }, {
            model: this.models['UserResume'],
            as: 'resumes',
            attributes: ['id', 'created_at', 'resume_name', 'resume_email', 'resume_education', 'resume_working_years']
        }];

        data.distinct = true;

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
}

module.exports = new JobResumeAssociatedController();
