const router = require('express').Router();
const { User } = require('../../models');

// Route to create an account and register a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        // set up a session to store the user information 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// route for user sign in
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Try again.' });
            return;
        }
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You have been logged in successfully!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// route for logging out
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => res.status(204).end())
        }
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;