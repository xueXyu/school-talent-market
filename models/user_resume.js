/* jshint indent: 2 */

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
    }, {
        tableName: 'user_resume',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
};
