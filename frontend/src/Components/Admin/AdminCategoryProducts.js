import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import {toast} from 'react-toastify';
import { fetchHomePageBannerCarouselImages } from '../../services/api';

const AdminCategoryProducts = () => {

    const [categoryImage, setCategoryImage] = useState(null);
    const [dailySalesImage, setDailySalesImage] = useState(null);
    const [dealImage, setDealImage] = useState(null);
    const [bannerImages, setBannerImages] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');

    // Handle banner image change
    const handleBannerImagesChange = (e) => {
        setBannerImages([...e.target.files]); // Store selected files in state
    };

    // Function to handle image upload
    const handleBannerImageUpload = async () => {
        if (bannerImages.length === 0) {
            alert('Please select images first');
            return;
        }

        const formData = new FormData();

        // Append each selected file to FormData
        bannerImages.forEach((image) => {
            formData.append('image', image);
        });

        try {
            const response = fetchHomePageBannerCarouselImages(formData);
            // setUploadMessage('Images uploaded successfully');
            toast.success(response?.data?.message);
            console.log('Uploaded Image URLs:', response.data.imageUrls); // Handle the returned image URLs
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.error('Error uploading images:', error);
            // setUploadMessage('Failed to upload images');
        }
    };

    return (
        <div className="container mx-auto py-12 px-6 bg-gray-900 min-h-screen">

            <h1 className="text-4xl font-bold text-white text-center mb-12">Admin Home Page - Category Products Upload</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Featured Categories Section */}
                <div className="bg-gray-800 shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-white mb-6">Featured Categories</h2>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Category Type (e.g., Dairy, Electronics)"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <label className="block w-full p-3 border border-teal-300 rounded-md text-center cursor-pointer hover:bg-teal-100 transition">
                            <FaUpload className="inline mr-2" /> Upload Product Image
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
                            />
                        </label>
                        {categoryImage && (
                            <img
                                src={URL.createObjectURL(categoryImage)}
                                alt="Category"
                                className="h-40 object-cover rounded-lg mt-4 shadow-md"
                            />
                        )}
                    </div>
                    <button
                        className="bg-teal-500 text-white w-full py-3 px-6 rounded-full hover:bg-teal-600 transition-colors mt-6"
                    >
                        Save
                    </button>
                </div>

                {/* Banner Carousel Section */}
                <div className="bg-gray-800 shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-white mb-6">Home Page Banner Carousel</h2>
                    <label className="block w-full p-3 border border-teal-300 rounded-md text-center cursor-pointer hover:bg-teal-100 transition">
                        <FaUpload className="inline mr-2" /> Upload Banner Image
                        <input
                            type="file"
                            multiple // Allow multiple image selection
                            className="hidden"
                            onChange={handleBannerImagesChange}
                        />
                    </label>
                    {bannerImages && bannerImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {bannerImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt="Banner"
                                    className="h-40 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    )}
                    <button
                        className="bg-teal-500 text-white w-full py-3 px-6 rounded-full hover:bg-teal-600 transition-colors mt-6"
                        onClick={handleBannerImageUpload}
                    >
                        Save
                    </button>

                    {/* Upload status message */}
                    {uploadMessage && (
                        <p className="text-white mt-4 text-center">{uploadMessage}</p>
                    )}
                </div>

                {/* Daily Best Sales Section */}
                <div className="bg-gray-800 shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-white mb-6">Daily Best Sales</h2>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <textarea
                            placeholder="Description"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <label className="block w-full p-3 border border-teal-300 rounded-md text-center cursor-pointer hover:bg-teal-100 transition">
                            <FaUpload className="inline mr-2" /> Upload Sales Image
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setDailySalesImage(e.target.files[0])}
                            />
                        </label>
                        {dailySalesImage && (
                            <img
                                src={URL.createObjectURL(dailySalesImage)}
                                alt="Daily Sales"
                                className="h-40 object-cover rounded-lg mt-4 shadow-md"
                            />
                        )}
                    </div>
                    <button
                        className="bg-teal-500 text-white w-full py-3 px-6 rounded-full hover:bg-teal-600 transition-colors mt-6"
                    >
                        Save
                    </button>
                </div>

                {/* Deal of the Day Section */}
                <div className="bg-gray-800 shadow-lg rounded-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-white mb-6">Deal of the Day</h2>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <textarea
                            placeholder="Description"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="number"
                            placeholder="Rating"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Category (e.g., Electronics)"
                            className="block w-full p-3 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-300 bg-gray-700 text-white"
                        />
                        <label className="block w-full p-3 border border-teal-300 rounded-md text-center cursor-pointer hover:bg-teal-100 transition">
                            <FaUpload className="inline mr-2" /> Upload Deal Image
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setDealImage(e.target.files[0])}
                            />
                        </label>
                        {dealImage && (
                            <img
                                src={URL.createObjectURL(dealImage)}
                                alt="Deal of the Day"
                                className="h-40 object-cover rounded-lg mt-4 shadow-md"
                            />
                        )}
                    </div>
                    <button
                        className="bg-teal-500 text-white w-full py-3 px-6 rounded-full hover:bg-teal-600 transition-colors mt-6"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AdminCategoryProducts
