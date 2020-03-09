'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');
const RestController = require('../rest');

class JobResumeAssociatedController extends RestController {
    constructor() {
        super('JobResumeAssociated');
    }


}

module.exports = new JobResumeAssociatedController();
