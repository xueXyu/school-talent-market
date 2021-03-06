'use strict'

const _ = require('lodash')
const Joi = require('@hapi/joi')
const RestController = require('../rest')
const credential = require('credential')
const pwd = credential()
const md5 = require('md5-node')

class AdminController extends RestController {
    constructor() {
        super('Admin')
    }

    /**
     * 登录
     */
    login(req, res) {
        const rules = Joi.object({
            // 3 - 30 个 数字字母
            username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            // 6 - 30 位 字母数字组合密码
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        })
        const { error, value } = rules.validate(req.body)
        if (error) {
            return res.replyError(error)
        }

        this.model.findOne({
            where: { admin_account: value.username }
        }).then((admin) => {
            if (admin) {
                return pwd.verify(admin.admin_password, value.password).then((pwdres) => {
                    if (pwdres) {
                        res.json({
                            code: 0,
                            message: 'success',
                            data: {
                                token: 'admin-token'
                            }
                        })
                    } else {
                        req.session.destroy()
                        res.replyCannot('账号或密码错误！')
                    }
                })
            } else {
                res.replyCannot('账号不存在！')
            }
        })
    }

    /**
     * 退出
     */
    logout(req, res) {
        res.json({
            code: 0,
            message: 'success',
            data: {}
        })
    }

    /**
     * getinfo
     */
    info(req, res) {
        res.json({
            code: 0,
            message: 'success',
            data: {
                roles: ['admin'],
                introduction: '我是一个超级管理员',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: '超级管理员'
            }
        })
    }

}

module.exports = new AdminController()
