const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Trip, Location, Journal, Packlist } = require('../models');

//route to display one trip when clicked on
router.get('/trip/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });
        const trip = tripData.get({ plain: true });
        res.render('mytrip', {
            trip,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// homepage for authenticated user is the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: Trip }]
        })
        const user = userData.get({ plain: true });
        console.log(user);
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to login to account
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;