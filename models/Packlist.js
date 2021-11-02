const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Packlist extends Model { }

Packlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
        },
        items: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'packlist',
    }
);

module.exports = Packlist;