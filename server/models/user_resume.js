/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserResume', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        resume_name: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: ''
        },
        resume_email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        },
        resume_education: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: ''
        },
        resume_working_years: {
            type: DataTypes.STRING(32),
            allowNull: true,
            defaultValue: ''
        },
        resume_job_intension: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, util.addModelCommonOptions({
        tableName: 'user_resume'
    }));
};
