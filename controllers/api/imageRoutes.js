const router = require('express').Router();
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload');
const { Image } = require('../../models');

// route to post 
router.post('/', withAuth, upload.single('image'), async (req, res) => {
    console.log(req.file.path);
    const filepath = req.file.path.split("\\")
    console.log(filepath)
    try {
        const newImage = await Image.create({
            path_name: filepath[2],
            user_id: req.session.user_id,
        });
        res.render('upload', {logged_in: req.session.logged_in})
    } catch (err) {
        res.status(400).json(err);
    }

});

module.exports = router;