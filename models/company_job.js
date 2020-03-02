/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('CompanyJob', {
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
        company_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'company',
                key: 'id'
            }
        },
        job_name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '0'
        },
        job_salary: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '0'
        },
        job_gender: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            defaultValue: '无'
        },
        job_way: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            defaultValue: '全职'
        },
        job_description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, util.addModelCommonOptions({
        tableName: 'company_job'
    }));
};
