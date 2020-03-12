/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    const model = sequelize.define('UserLikeJob', {
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
        job_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'company_job',
                key: 'id'
            }
        },
        company_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'company',
                key: 'id'
            }
        }
    }, util.addModelCommonOptions({
        tableName: 'user_like_job'
    }));

    model.associate = function (models) {
        models.User.hasMany(models.UserLikeJob, {
            as: 'userlikejob',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });
        models.UserLikeJob.belongsTo(models.User, {
            as: 'user',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });

        models.CompanyJob.hasMany(models.UserLikeJob, {
            as: 'userlikejob',
            sourceKey: 'id',
            foreignKey: 'job_id',
        });
        models.UserLikeJob.belongsTo(models.CompanyJob, {
            as: 'jobs',
            sourceKey: 'id',
            foreignKey: 'job_id',
        });

        models.Company.hasMany(models.UserLikeJob, {
            as: 'userlikejob',
            sourceKey: 'id',
            foreignKey: 'company_id',
        });
        models.UserLikeJob.belongsTo(models.Company, {
            as: 'company',
            sourceKey: 'id',
            foreignKey: 'company_id',
        });
    };

    return model;
};
