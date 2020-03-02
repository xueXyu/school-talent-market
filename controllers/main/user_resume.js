'use strict';

const _ = require('lodash');
const joi = require('@hapi/joi');
const RestController = require('./rest');

class UserResumeController extends RestController {
    constructor() {
        super('UserResume');
    }

    /**
     * 分页返回所有对象
     */
    index(req, res) {
        res.reply('index');
        // const params = req.query || {};
        // const data = {
        //     offset: +params.offset || 0,
        //     limit: +params.limit || 10
        // };
        // if (params.where && _.isObject(params.where)) {
        //     data.where = params.where;
        // }
        // const Admin = this.models['Admin'];
        // data.include = [{model: Admin, as: 'admin'}];
        // data.distinct = true;
        // res.reply(this.model.findAndCountAll(data));
    }

    /**
     * 创建对象
     */
    create(req, res) {
        res.reply('create');
    }

    /**
     * 更新对象
     */
    update(req, res) {
        res.reply('update');
    }

    /**
     * 删除单个对象
     */
    destroy(req, res) {
        res.reply('destroy');
    }
}

module.exports = new UserResumeController();
