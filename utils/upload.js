const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 4000000}
});

module.exports = upload;