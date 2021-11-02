const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Trip, Location, Journal, Packlist } = require('../models');

//homepage displays all trips
router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        const trips = tripData.map((trip) => trip.get({ plain: true }));
        res.render('homepage', {
            trips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});