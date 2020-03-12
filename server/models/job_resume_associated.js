/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    const model = sequelize.define('JobResumeAssociated', {
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
            type: DataTypes.CHAR(5),
            allowNull: false,
            defaultValue: '申请中'
        }
    }, util.addModelCommonOptions({
        tableName: 'job_resume_associated'
    }));

    model.associate = function (models) {
        models.User.hasMany(models.JobResumeAssociated, {
            as: 'job2resume',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });
        models.JobResumeAssociated.belongsTo(models.User, {
            as: 'user',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });

        models.Company.hasMany(models.JobResumeAssociated, {
            as: 'job2resume',
            sourceKey: 'id',
            foreignKey: 'company_id',
        });
        models.JobResumeAssociated.belongsTo(models.Company, {
            as: 'company',
            sourceKey: 'id',
            foreignKey: 'company_id',
        });

        models.UserResume.hasMany(models.JobResumeAssociated, {
            as: 'job2resume',
            sourceKey: 'id',
            foreignKey: 'resume_id',
        });
        models.JobResumeAssociated.belongsTo(models.UserResume, {
            as: 'resumes',
            sourceKey: 'id',
            foreignKey: 'resume_id',
        });

        models.CompanyJob.hasMany(models.JobResumeAssociated, {
            as: 'job2resume',
            sourceKey: 'id',
            foreignKey: 'job_id',
        });
        models.JobResumeAssociated.belongsTo(models.CompanyJob, {
            as: 'jobs',
            sourceKey: 'id',
            foreignKey: 'job_id',
        });
    };

    return model;
};
