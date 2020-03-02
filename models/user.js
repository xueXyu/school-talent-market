/* jshint indent: 2 */

const util = require('../util');

module.exports = function (sequelize, DataTypes) {
    const model = sequelize.define('User', {
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
        user_account: {
            type: DataTypes.STRING(32),
            allowNull: false,
            defaultValue: '0'
        },
        user_password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: '0'
        },
        user_name: {
            type: DataTypes.STRING(32),
            allowNull: true,
            defaultValue: ''
        },
        user_gender: {
            type: DataTypes.CHAR(5),
            allowNull: true,
            defaultValue: '未知'
        },
        user_age: {
            type: DataTypes.INTEGER(5),
            allowNull: true,
            defaultValue: '0'
        },
        user_phone: {
            type: DataTypes.STRING(32),
            allowNull: true,
            defaultValue: ''
        },
        user_img: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        }
    }, util.addModelCommonOptions({
        tableName: 'user'
    }));


    model.associate = function (models) {
        models.User.hasMany(models.UserResume, {
            as: 'resumes',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });
        models.UserResume.belongsTo(models.User, {
            as: 'user',
            sourceKey: 'id',
            foreignKey: 'user_id',
        });
    };

    return model;
};
