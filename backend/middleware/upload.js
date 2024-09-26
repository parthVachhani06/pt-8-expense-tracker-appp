const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads');
    },
    filename: (req, file, next) => {
        const uq = Date.now() + "-" + file.originalname;
        next(null, uq);
    }
})

const upload = multer({ storage });
module.exports = upload;