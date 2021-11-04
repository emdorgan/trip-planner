const User = require("./User");
const Trip = require("./Trip");
const Location = require("./Location");
const Packlist = require("./Packlist");
const Journal = require("./Journal");

User.hasMany(Trip, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

User.hasMany(Packlist, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

User.hasMany(Journal, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

Trip.hasMany(Location, {
    foreignKey: "trip_id",
    onDelete: 'CASCADE'
});

Trip.hasMany(Journal, {
    foreignKey: "trip_id",
    onDelete: 'CASCADE'
});

Trip.hasMany(Packlist, {
    foreignKey: "trip_id",
    onDelete: 'CASCADE'
});

Trip.belongsTo(User, {
    foreignKey: "user_id",
});

Packlist.belongsTo(User, {
    foreignKey: "user_id",
});

Packlist.belongsTo(Trip, {
    foreignKey: "trip_id",
});

Journal.belongsTo(User, {
    foreignKey: "user_id",
});

Journal.belongsTo(Trip, {
    foreignKey: "trip_id",
});

Location.belongsTo(Trip, {
    foreignKey: "trip_id",
});

module.exports = { User, Trip, Location, Packlist, Journal };