/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Admin', {
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
        admin_account: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '0'
        },
        admin_password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: '0'
        }
    }, util.addModelCommonOptions({
        tableName: 'admin'
    }));
};
