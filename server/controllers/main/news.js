'use strict'

const _ = require('lodash')
const Joi = require('@hapi/joi')
const RestController = require('../rest')
const Sequelize = require('sequelize')
const moment = require('moment')

class NewsController extends RestController {
    constructor() {
        super('News')
    }

    /**
     * 分页返回所有对象
     */
    index(req, res) {
        const params = req.query || {}
        const data = {
            offset: +params.offset || 0,
            limit: +params.limit || 10
        }
        if (params.where && _.isObject(params.where)) {
            data.where = params.where
        }
        if (params.order && _.isObject(params.order)) {
            data.order = [
                params.order
            ]
        }
        res.reply(this.model.findAndCountAll(data))
    }

    /**
     * 创建对象
     */
    create(req, res) {
        let data = req.body
        if (this.restRules.create) {
            const validate = joi.validate(req.body, this.restRules.create)
            if (validate.error) {
                return res.replyError(validate.error)
            }
            data = validate.value
        }
        res.reply(this.model.create(data))
    }

    /**
     * 更新对象
     */
    update(req, res) {
        if (!req.params || !req.params.id) {
            return res.replyError('missing id parameter')
        }

        let data = req.body
        if (this.restRules.update) {
            const validate = joi.validate(req.body, this.restRules.update)
            if (validate.error) {
                return res.replyError(validate.error)
            }
            data = validate.value
        }
        res.reply(this.model.update(data, { where: { id: req.params.id } }))
    }

    /**
     * 删除单个对象
     */
    destroy(req, res) {
        if (!req.params || !req.params.id) {
            return res.replyError('missing id parameter')
        }

        this.model.findByPk(req.params.id).then((obj) => {
            if (obj) {
                res.reply(obj.destroy())
            } else {
                res.replyError(this.modelName + ' not found')
            }
        })
    }

    /**
     * 统计数据
     */
    homeStatistics(req, res) {
        const CompanyJob = this.models['CompanyJob']
        const User = this.models['User']
        const UserResume = this.models['UserResume']
        const Company = this.models['Company']

        var count_job = new Promise(function(resolve, reject) {
            CompanyJob.count().then((result) => {
                resolve(result)
            })
        })
        var count_user = new Promise(function(resolve, reject) {
            User.count().then((result) => {
                resolve(result)
            })
        })
        var count_resume = new Promise(function(resolve, reject) {
            UserResume.count().then((result) => {
                resolve(result)
            })
        })
        var count_company = new Promise(function(resolve, reject) {
            Company.count().then((result) => {
                resolve(result)
            })
        })

        Promise.all([count_job, count_user, count_resume, count_company])
            .then(function(results) {
                res.json({
                    code: 0,
                    message: 'success',
                    data: {
                        count_job: results[0] * 100,
                        count_user: results[1] * 100,
                        count_resume: results[2] * 100,
                        count_company: results[3] * 100
                    }
                })
            })
            .catch(function(error) {
                console.log(error)
                res.json({
                    code: 1,
                    message: error,
                    data: '查询出错'
                })
            })
    }

    /**
     * 用户反馈
     */
    homeFeedback(req, res) {
        var result = {
            'count': 3,
            'rows': [
                {
                    name: '王二妞',
                    title: '前端设计师',
                    feedback: '哈哈哈，感谢这个网站，为我找到了合适的工作，希望你们越办越好，为更多的人提供方便。',
                    head: 'static/images/authors/author-1.jpg'
                }, {
                    name: '李铁蛋',
                    title: '销售经理',
                    feedback: '感谢~找到了好久的工作，都没有结果，在这里很快就找到了一个干销售的工作，最开始还不太明白，后来就越赚越多，哈哈哈，简直是走上人生巅峰。',
                    head: 'static/images/authors/author-2.jpg'
                }, {
                    name: '张全蛋',
                    title: '后端工程师',
                    feedback: '苦逼程序猿，天天敲代码，不过还好在这个网站找到了一个大公司收留，哈哈哈，希望网站越办越好，墙裂推荐！',
                    head: 'static/images/authors/author-3.jpg'
                }
            ]
        }

        res.json({
            code: 0,
            message: 'success',
            data: result
        })
    }

    /**
     * 每日增量统计
     */
    dailyIncrease(req, res) {
        const CompanyJob = this.models['CompanyJob']
        const User = this.models['User']
        const UserResume = this.models['UserResume']
        const Company = this.models['Company']

        const CompanyJobs = this.models['CompanyJob']
        const Users = this.models['User']
        const UserResumes = this.models['UserResume']
        const Companys = this.models['Company']

        // 算出时间跨度
        var day1 = new Promise(function(resolve, reject) {
            CompanyJob.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'min_day'],
                    [Sequelize.fn('MAX', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'max_day']
                ],
                raw: true
            }).then((result) => {
                resolve(result)
            })
        })

        var day2 = new Promise(function(resolve, reject) {
            User.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'min_day'],
                    [Sequelize.fn('MAX', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'max_day']
                ],
                raw: true
            }).then((result) => {
                resolve(result)
            })
        })

        var day3 = new Promise(function(resolve, reject) {
            UserResume.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'min_day'],
                    [Sequelize.fn('MAX', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'max_day']
                ],
                raw: true
            }).then((result) => {
                resolve(result)
            })
        })

        var day4 = new Promise(function(resolve, reject) {
            Company.findAll({
                attributes: [
                    [Sequelize.fn('MIN', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'min_day'],
                    [Sequelize.fn('MAX', Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')), 'max_day']
                ],
                raw: true
            }).then((result) => {
                resolve(result)
            })
        })

        // 计算某天的数据
        function jobDayCount(input_day) {
            return new Promise(function(resolve, reject) {
                CompanyJobs.findAll({
                    attributes: [
                        [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'), 'day'],
                        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
                    ],
                    group: [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')],
                    having: { 'day': input_day },
                    raw: true
                }).then((result) => {
                    var res = {
                        name: 'jobs',
                        data: null
                    }
                    if (_.isEmpty(result)) {
                        res.data = { day: input_day, count: 0 }
                    } else {
                        res.data = Object.assign({}, result)[0]
                    }

                    resolve(res)
                })
            })
        }

        function userDayCount(input_day) {
            return new Promise(function(resolve, reject) {
                Users.findAll({
                    attributes: [
                        [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'), 'day'],
                        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
                    ],
                    group: [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')],
                    having: { 'day': input_day },
                    raw: true
                }).then((result) => {
                    var res = {
                        name: 'users',
                        data: null
                    }
                    if (_.isEmpty(result)) {
                        res.data = { day: input_day, count: 0 }
                    } else {
                        res.data = Object.assign({}, result)[0]
                    }

                    resolve(res)
                })
            })
        }

        function resumeDayCount(input_day) {
            return new Promise(function(resolve, reject) {
                UserResumes.findAll({
                    attributes: [
                        [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'), 'day'],
                        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
                    ],
                    group: [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')],
                    having: { 'day': input_day },
                    raw: true
                }).then((result) => {
                    var res = {
                        name: 'resumes',
                        data: null
                    }
                    if (_.isEmpty(result)) {
                        res.data = { day: input_day, count: 0 }
                    } else {
                        res.data = Object.assign({}, result)[0]
                    }

                    resolve(res)
                })
            })
        }

        function companyDayCount(input_day) {
            return new Promise(function(resolve, reject) {
                Companys.findAll({
                    attributes: [
                        [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'), 'day'],
                        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
                    ],
                    group: [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d')],
                    having: { 'day': input_day },
                    raw: true
                }).then((result) => {
                    var res = {
                        name: 'companys',
                        data: null
                    }
                    if (_.isEmpty(result)) {
                        res.data = { day: input_day, count: 0 }
                    } else {
                        res.data = Object.assign({}, result)[0]
                    }

                    resolve(res)
                })
            })
        }

        Promise.all([day1, day2, day3, day4])
            .then((results) => {
                // 计算出四个表的时间跨度，日期的最大最小值
                var min_arr = []
                var max_arr = []
                _.forEach(results, function(value, key) {
                    min_arr.push(moment(value[0].min_day, 'YYYY-MM-DD'))
                    max_arr.push(moment(value[0].max_day, 'YYYY-MM-DD'))
                })
                var min_day = moment.min(min_arr)
                var max_day = moment.max(max_arr)
                return {
                    min: min_day,
                    max: max_day
                }
            }).then((days) => {
            // 计算出日期list
            var day_list = []
            var diff_day = days.max.diff(days.min, 'days')
            // console.log(days.min, days.max, diff_day)
            while (diff_day > -1) {
                var day = days.min.format('YYYY-MM-DD')
                day_list.push(day)
                days.min.add(1, 'day')
                diff_day--
            }
            // console.log(day_list)
            return day_list
        }).then((days) => {
            // console.log(days);
            var day_counts = []
            var all_count = []
            _.forEach(days, function(val) {
                all_count.push(jobDayCount(val), userDayCount(val), resumeDayCount(val), companyDayCount(val))
            })

            Promise.all(all_count)
                .then((results) => {
                    // console.log('执行成功')
                    // console.log(results)
                    var xaxis = days
                    var companys = []
                    var users = []
                    var jobs = []
                    var resumes = []
                    _.forEach(results, function(vv) {
                        _.forEach(days, function(day) {
                            if (vv.name === 'companys' && vv.data.day === day) {
                                companys.push(vv.data.count)
                            } else if (vv.name === 'jobs' && vv.data.day === day) {
                                jobs.push(vv.data.count)
                            } else if (vv.name === 'users' && vv.data.day === day) {
                                users.push(vv.data.count)
                            } else if (vv.name === 'resumes' && vv.data.day === day) {
                                resumes.push(vv.data.count)
                            }
                        })
                    })
                    // console.log(companys, users, jobs, resumes)
                    res.json({
                        code: 0,
                        message: 'success',
                        data: {
                            xaxis_list: xaxis,
                            job_list: jobs,
                            user_list: users,
                            resume_list: resumes,
                            company_list: companys,
                        }
                    })
                })
        }).catch(function(error) {
            res.json({
                code: 1,
                message: error,
                data: '查询出错'
            })
        })
    }
}

module.exports = new NewsController()
