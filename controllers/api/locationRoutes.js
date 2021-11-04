const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Location } = require('../../models');

// add new location
router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const newLocation = await Location.create({
            ...req.body,
        });
        res.status(200).json(newLocation);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a location
router.put('/:id', withAuth, async (req, res) => {
    try {
        const locationData = await Location.update(req.body,
            {
                where: { id: req.params.id }
            })
        if (!locationData) {
            res.status(404).json({ message: 'Could not find a location with that id' })
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// delete a location
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!locationData) {
            res.status(404).json({ message: 'Could not find a location with that id' })
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;