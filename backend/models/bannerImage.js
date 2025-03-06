const mongoose = require('mongoose');

const bannerImageSchema = new mongoose.Schema({
    imageUrls: {
        type: [String],
        required: true
    }
});

const BannerImage = mongoose.model('BannerImage', bannerImageSchema);

module.exports = BannerImage;
