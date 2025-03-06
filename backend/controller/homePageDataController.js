const express = require('express');
const BannerImage = require('../models/bannerImage');
const cloudinary = require('../config/cloudinary');


const uploadBannerCarouselImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'bannerImages' },  // Specify folder
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            reject('Cloudinary upload failed');
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(file.buffer); // Use .end() to send the file buffer
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        // Create a new BannerImage document
        const bannerImage = new BannerImage({
            imageUrls: imageUrls // Store array of URLs
        });

        // Save the document to MongoDB
        await bannerImage.save();
        res.json({
            message: 'Images uploaded successfully',
            imageUrls: bannerImage.imageUrls
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to upload images' });
    }
}

const getBannerImages = async (req, res) => {
    try {
        const bannerImages = await BannerImage.find();
        res.json(bannerImages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch banner images' });
    }
}

module.exports = {
    uploadBannerCarouselImages,
    getBannerImages
}