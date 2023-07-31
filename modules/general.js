const fs = require('fs');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')[1];
        const fileName = Date.now() + "." + ext;
        cb(null, fileName);
    },
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

function multerFileStorage() {
    return multer({ storage: storage });
}


module.exports = {
    base64_encode,
    multerFileStorage
}