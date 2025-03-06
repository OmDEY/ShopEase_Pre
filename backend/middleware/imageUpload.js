const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory buffer temporarily

// Upload images to Cloudinary
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'mainImages' || file.fieldname.startsWith('additionalInfo[')) {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
};

const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: fileFilter
}).any(); // Use .any() to accept all files and filter them manually

module.exports = imageUpload;