'use strict';

const _ = require('lodash');
const models = require('../models');

/**
 * 控制器基类，提供默认的控制器方法
 */
class BaseController {
  /**
   * Creates an instance of BaseController.
   */
  constructor() {
    this.sequelize = models.sequelize;
    this.models = models;
  }

  /**
   * 模型数组转换为JSON并过滤字段
   *
   * @param {*} modelArr
   * @param {*} fields
   */
  filterModels(modelArr, fields) {
    return _.map(modelArr, (o) => {
      let result;
      const temp = o.toJSON();
      if (!fields || !fields.length) {
        result = temp;
      } else {
        result = {};
        _.forEach(fields, field => {
          result[field] = temp[field];
        });
      }
      return result;
    });
  }
}

module.exports = BaseController;
