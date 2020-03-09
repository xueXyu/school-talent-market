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
        res.reply(this.model.findAndCountAll(data));
    }

}

module.exports = new UserLikeJobController();
