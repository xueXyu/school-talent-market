'use strict';

const _ = require('lodash');
const joi = require('@hapi/joi');
const md5 = require('md5-node');
const RestController = require('../rest');

class UserController extends RestController {
    constructor() {
        super('User');
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

module.exports = new UserController();
