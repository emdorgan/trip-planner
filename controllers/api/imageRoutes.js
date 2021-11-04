const router = require('express').Router();
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload');
const { Image } = require('../../models');

// route to post 
router.post('/', withAuth, upload.single('image'), async (req, res) => {
    console.log(req.file.path);
    try {
        const newImage = await Image.create({
            path_name: req.file.path,
            user_id: req.session.user_id,
        });
        res.status(200).json(newImage);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;