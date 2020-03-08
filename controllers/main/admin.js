'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class AdminController extends RestController {
    constructor() {
        super('Admin');
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
    updatePassword(req, res) {
        res.reply('update');
    }
}

module.exports = new AdminController();
