'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class CompanyController extends RestController {
    constructor() {
        super('Company');
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
                attributes: ['id', 'created_at', 'job_name','job_salary','job_gender','job_way'
                ]
            }]
        };
        res.reply(this.model.findOne(data));
    }
}

module.exports = new CompanyController();
