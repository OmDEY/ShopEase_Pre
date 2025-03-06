const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'legendcoder',
    api_key: '598723716471318',
    api_secret: '3234a2CH30vfkQXn-L2118IDWEA',
});

module.exports = cloudinary;