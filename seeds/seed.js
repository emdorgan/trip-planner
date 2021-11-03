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

    const trips = await User.bulkCreate(tripData, {
      individualHooks: true,
      returning: true,
    });

    const locations = await User.bulkCreate(locationData, {
      individualHooks: true,
      returning: true,
    });

    const journals = await User.bulkCreate(journalData, {
      individualHooks: true,
      returning: true,
    });

    const packlists = await User.bulkCreate(packlistData, {
      individualHooks: true,
      returning: true,
    });
    
process.exit(0);
};

seedDatabase();