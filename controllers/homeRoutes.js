const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Trip, Location, Journal, Packlist, Image } = require('../models');

//route to display one trip when clicked on
router.get('/trip/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: Location,
                },
            ],
        });
        const trip = tripData.get({ plain: true });

        res.render('trip', {
            ...trip,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// homepage for authenticated user is the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id)
        const userData = await User.findByPk(req.session.user_id, {

            attributes: { exclude: ['password'] },
            include: [{ model: Trip }]
        })
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to location; rendering information to mylocation handlebars
//work on this once I got the trip to be filled out
router.get('/trip/:trip/locations/:id', withAuth, async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
            include: [
                {
                    model: Trip,
                },
            ],
        });
        const location = locationData.get({ plain: true });

        res.render('mylocation', {
            ...location,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to Journal , rendering information to journal handlebars
router.get('/trip/:id/journal/', withAuth, async (req, res) => {
    try {
        const journalData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: Journal,
                },
            ],
        });
        const journal = journalData.get({ plain: true });

        res.render('journal', {
            ...journal,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to Packlist , rendering information to packlist handlebars
router.get('/trip/:id/packlist/', withAuth, async (req, res) => {
    try {
        const packlistData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: Packlist,
                },
            ],
        });
        console.log(packlistData);
        const packlist = packlistData.get({ plain: true });
        console.log(packlist);
        res.render('packlist', {
            ...packlist,
            logged_in: req.session.logged_in
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

// route to get the images to album
router.get('/album', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id)
        const userData = await User.findByPk(req.session.user_id, {

            attributes: { exclude: ['password'] },
            include: [{ model: Image }]
        })
        const user = userData.get({ plain: true });
        console.log(user);
        res.render('album', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/upload', withAuth, async (req, res) => {
    try {
        res.render('upload', {logged_in: req.session.logged_in})
    }catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;