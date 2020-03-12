'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class UserLikeJobController extends RestController {
    constructor() {
        super('UserLikeJob');
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
        }];

        data.distinct = true;

        res.reply(this.model.findAndCountAll(data));
    }

}

module.exports = new UserLikeJobController();
