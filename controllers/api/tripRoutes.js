const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Trip } = require('../../models');

// add new trip
router.get('/', withAuth, async (req, res) => {
    try {
        const newTrip = await Trip.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newTrip);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a trip
router.put('/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.update(req.body,
            {
                where: { id: req.params.id }
            })
        if (!tripData) {
            res.status(404).json({ message: 'Could not find a trip with that id' })
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// delete a trip
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!tripData) {
            res.status(404).json({ message: 'Could not find a trip with that id' })
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;