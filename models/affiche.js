/* jshint indent: 2 */
const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Affiche', {
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
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'title'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, util.addModelCommonOptions({
        tableName: 'affiche'
    }));
};
