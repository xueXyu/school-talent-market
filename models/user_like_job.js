/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserLikeJob', {
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
        }
    }, util.addModelCommonOptions({
        tableName: 'user_like_job'
    }));
};
