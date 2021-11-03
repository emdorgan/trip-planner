const sequelize = require('../config/connection');
const { User, Journal, Location, Packlist, Trip } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const locationData = require('./locationData.json');
const journalData = require('./journalData.json');
const packlistData = require('./packlistData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const trips = await Trip.bulkCreate(tripData);

    const locations = await Location.bulkCreate(locationData);

    const journals = await Journal.bulkCreate(journalData);

    const packlists = await Packlist.bulkCreate(packlistData);
    
process.exit(0);
};

seedDatabase();