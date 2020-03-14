'use strict'

const _ = require('lodash')
const Joi = require('@hapi/joi')
const RestController = require('../rest')
const credential = require('credential')
const pwd = credential()
const md5 = require('md5-node')

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

class AdminController extends RestController {
    constructor() {
        super('Admin')
    }

    /**
     * 登录
     */
    login(req, res) {
        res.json({
            code: 0,
            data: {
                token: 'admin-token'
            }
        })
    }

    /**
     * 退出
     */
    logout(req, res) {
        res.json({
            code: 0,
            data: 'success'
        })
    }

    /**
     * getinfo
     */
    info(req, res) {
        res.json({
            code: 0,
            data: {
                roles: ['admin'],
                introduction: 'I am a super administrator',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: 'Super Admin'
            }
        })
    }

    // /**
    //  * 用户和公司注册
    //  */
    // create(req, res) {
    //     const rules = Joi.object({
    //         // 3 - 30 个 数字字母
    //         username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    //         // 6 - 30 位 字母数字组合密码
    //         password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
    //     })
    //     const { error, value } = rules.validate(req.body)
    //     if (error) {
    //         return res.replyCannot(error)
    //     }
    //
    //     const result = this.model.findOne({
    //         where: { admin_account: value.username }
    //     }).then((admin) => {
    //         if (!admin) {
    //             return pwd.hash(value.password).then((hash) => {
    //                 return this.sequelize.transaction((t) => {
    //                     return this.model.create({
    //                         admin_account: value.username,
    //                         admin_password: hash
    //                     }, { transaction: t }).then((admin) => {
    //                         const adminData = {
    //                             id: admin.id
    //                         }
    //                         req.session.admin = adminData
    //                         return admin
    //                     })
    //                 })
    //             })
    //         } else {
    //             res.replyCannot('管理员账号已存在！')
    //         }
    //     })
    //
    //     res.reply(result)
    // }

    // /**
    //  * 登录
    //  */
    // login(req, res) {
    //     const rules = Joi.object({
    //         // 3 - 30 个 数字字母
    //         username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    //         // 6 - 30 位 字母数字组合密码
    //         password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
    //     })
    //     const { error, value } = rules.validate(req.body)
    //     if (error) {
    //         return res.replyError(error)
    //     }
    //
    //     const result = this.model.findOne({
    //         where: { admin_account: value.username }
    //     }).then((admin) => {
    //         if (admin) {
    //             return pwd.verify(admin.admin_password, value.password).then((pwdres) => {
    //                 if (pwdres) {
    //                     req.session.admin = {
    //                         id: admin.id
    //                     }
    //                     admin.dataValues.token = md5(admin.id + admin.admin_account)
    //                     return admin
    //                 } else {
    //                     req.session.destroy()
    //                     res.replyCannot('管理员账号或密码错误！')
    //                 }
    //             })
    //         } else {
    //             res.replyCannot('管理员账号不存在！')
    //         }
    //     })
    //
    //     res.reply(result)
    // }

    // /**
    //  * 更新对象
    //  */
    // updatePassword(req, res) {
    //     res.reply('update')
    // }
}

module.exports = new AdminController()
