/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('JobResume', {
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
    }, {
        tableName: 'job_resume',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    });
};
