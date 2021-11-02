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

//route to display one trip when clicked on
router.get('/trip/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const trip = tripData.get({ plain: true });
        res.render('trip', {
            trip,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route back to user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Trip }]
        })

        const user = userData.get({ plain: true });
        res.render('dashboard', { user, logged_in: true })
    } catch (err) {
        res.status(500).json(err);
    }
});

