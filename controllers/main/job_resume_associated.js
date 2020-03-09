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
        res.reply(this.model.findAndCountAll(data));
    }
}

module.exports = new JobResumeAssociatedController();
