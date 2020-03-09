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
}

module.exports = new NewsController();
