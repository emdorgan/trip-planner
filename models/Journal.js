const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Journal extends Model { }

Journal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'location',
                key: 'id',
            },
        },
        way_point_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'journal',
    }
);

module.exports = Journal;