const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Location extends Model { }


//Sequence

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_address: {
            //add
        },
        vehicle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            //add
        },
        duration: {
            //add
        },
        location_activities: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location',
    }
);

module.exports = Location;