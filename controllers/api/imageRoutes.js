const router = require('express').Router();
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload');
const { Image } = require('../../models');

// route to post 
router.post('/upload', withAuth, upload.single('image'), async (req, res) => {
    console.log(req.file);
});

module.exports = router;