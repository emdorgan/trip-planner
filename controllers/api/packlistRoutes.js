const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Packlist } = require('../../models');

// add new packing list
router.post('/', withAuth, async (req, res) => {
    try {
        const newPacklist = await Packlist.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPacklist);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a packing list
router.put('/:id', withAuth, async (req, res) => {
    try {
        const packlistData = await Packlist.update(req.body,
            {
                where: { id: req.params.id }
            })
        if (!packlistData) {
            res.status(404).json({ message: 'Could not find a packing list with that id' })
        }

        res.status(200).json(packlistData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// delete a packing list
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const packlistData = await Packlist.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!packlistData) {
            res.status(404).json({ message: 'Could not find a packing list with that id' })
        }

        res.status(200).json(packlistData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;