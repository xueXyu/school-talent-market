'use strict';

const _ = require('lodash');
const joi = require('@hapi/joi');
const RestController = require('../rest');

class UserResumeController extends RestController {
    constructor() {
        super('UserResume');
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
