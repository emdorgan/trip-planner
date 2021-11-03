const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Journal } = require('../../models');

// add new journal entry
router.post('/', withAuth, async (req, res) => {
    try {
        const newJournal = await Journal.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newJournal);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a journal entry
router.put('/:id', withAuth, async (req, res) => {
    try {
        const journalData = await Journal.update(req.body,
            {
                where: {
                    id: req.params.id }
            })
        if (!journalData) {
            res.status(404).json({ message: 'Could not find a journal entry with that id' })
        }

        res.status(200).json(journalData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// delete a journal entry
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const journalData = await Journal.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!journalData) {
            res.status(404).json({ message: 'Could not find a journal entry with that id' })
        }

        res.status(200).json(journalData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;