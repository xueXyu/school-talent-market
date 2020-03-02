/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('JobResumeAssociated', {
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
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        job_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'company_job',
                key: 'id'
            }
        },
        resume_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'user_resume',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0'
        }
    }, util.addModelCommonOptions({
        tableName: 'job_resume_associated'
    }));
};
