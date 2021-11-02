const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Location extends Model { }

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
      type: DataTypes.STRING,
      allowNull: false,
      /*
                  name: Sequelize.STRING,
                  address: Sequelize.STRING,
                  latitude: {
                    type: DataTypes.INTEGER,
                    validate: {
                      min: -90,
                      max: 90
                    }
                  },
                  longitude: {
                    type: DataTypes.INTEGER,
                    validate: {
                      min: -180,
                      max: 180
                    }
                  },
                }, {
                  sequelize,
                  validate: {
                    bothCoordsOrNone() {
                      if ((this.latitude === null) !== (this.longitude === null)) {
                        throw new Error('Either both latitude and longitude, or neither!');
                      }
                    }
                  }
                })*/
    },
    vehicle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      //add
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
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