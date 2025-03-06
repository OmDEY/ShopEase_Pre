import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners'; // Add a loader, e.g., from react-spinners
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, useForm } from 'react-hook-form';
import { adminUpdateProduct } from '../../services/api';

const AdminEditProductModal = ({ product, isOpen, onClose, categories }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [updatedProduct, setUpdatedProduct] = useState(null);
    const [selectedImages, setSelectedImages] = useState(null);
    const [additionalInfoSections, setAdditionalInfoSections] = useState([{ id: Date.now(), info: '', images: [] }]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);  // Ensure updatedProduct is initialized from product
            setAdditionalInfoSections(product?.additionalInfo || [{ id: Date.now(), info: '', images: [] }]);
            setLoading(false); // Data is loaded, stop loading
        }
    }, [product]);

    if (!isOpen) {
        return null;
    }

    if (loading) {
        return (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <ClipLoader color="#ffffff" size={60} /> {/* Display loader while loading */}
            </motion.div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, category: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('title', updatedProduct.title);
        formData.append('description', updatedProduct.description);
        formData.append('price', updatedProduct.price);
        formData.append('category', updatedProduct.category);
        formData.append('stock', updatedProduct.stock);

        if (selectedImages) {
            Array.from(selectedImages).forEach((file, index) => {
                formData.append('mainImages', file);
            });
        }

        additionalInfoSections.forEach((section, index) => {
            formData.append(`additionalInfo[${index}][description]`, section.description);
            section.images.forEach((file, fileIndex) => {
                formData.append(`additionalInfo[${index}][images]`, file);
            });
        });

        // // Debugging: log all form data
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }


        try {
            const response = await adminUpdateProduct(formData, product._id);

            if (response.status === 200) {
                toast.success('Product updated successfully!');
                onClose();
            } else {
                toast.error('Failed to update product:', response.statusText);
            }
        } catch (error) {
            toast.error('An error occurred while updating the product:', error.message);
        }
    };


    const addAdditionalInfoSection = () => {
        setAdditionalInfoSections([...additionalInfoSections, { id: Date.now(), info: '', images: [] }]);
    };

    const handleAdditionalInfoChange = (id, field, value) => {
        const updatedSections = additionalInfoSections?.map((section) =>
            section.id === id ? { ...section, [field]: value } : section
        );
        setAdditionalInfoSections(updatedSections);
    };

    const handleAdditionalImageChange = (id, files) => {
        const updatedSections = additionalInfoSections.map((section) =>
            section.id === id
                ? { ...section, images: [...(section.images || []), ...Array.from(files)] }
                : section
        );
        setAdditionalInfoSections(updatedSections);
    };

    const removeAdditionalInfoSection = (id) => {
        const filteredSections = additionalInfoSections?.filter((section) => section.id !== id);
        setAdditionalInfoSections(filteredSections);
    };

    const removeImage = (sectionId, imageIndex) => {
        const updatedSections = additionalInfoSections.map((section) =>
            section.id === sectionId
                ? { ...section, images: section.images.filter((_, index) => index !== imageIndex) }
                : section
        );
        setAdditionalInfoSections(updatedSections);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-gray-900 text-white w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg relative"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="flex">
                        {/* Left Half */}
                        <div className="w-1/2 pr-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Title and Category */}
                                <div>
                                    <label className="block text-sm font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={updatedProduct?.title || ''} // Avoid undefined issues
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Category</label>
                                    <select
                                        value={updatedProduct?.category || ''} // Ensure category is selected correctly
                                        onChange={handleCategoryChange}
                                        className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a category</option>
                                        {categories && categories.length > 0 ? (
                                            categories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No categories available</option>
                                        )}
                                    </select>
                                </div>
                                {/* Price and Stock */}
                                <div>
                                    <label className="block text-sm font-medium">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={updatedProduct?.price || ''} // Avoid undefined issues
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={updatedProduct?.stock || ''} // Avoid undefined issues
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            {/* Description */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={updatedProduct?.description || ''} // Avoid undefined issues
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right Half */}
                        <div className="w-1/2 pl-4">
                            <label className="block text-sm font-medium">Images</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="w-full mt-1 p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {product?.images && product?.images?.length > 0 ? (
                                    product?.images?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                            alt={`Product ${index}`}
                                            className="w-full h-32 rounded-md object-cover"
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-center">No Images</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Sections */}
                    <div className="mt-6 max-h-60 overflow-y-auto">
                        <h3 className="text-lg font-medium">Additional Information(Optional)</h3>
                        {additionalInfoSections?.map((section) => (
                            <motion.div
                                key={section?.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-4 p-4 bg-gray-800 rounded-md"
                            >
                                <label className="block text-sm font-medium">Additional Description</label>
                                <textarea
                                    value={section?.description || ''}
                                    onChange={(e) => handleAdditionalInfoChange(section.id, 'info', e.target.value)}
                                    className="w-full mt-2 p-2 bg-gray-700 rounded-md"
                                />
                                <label className="block text-sm font-medium mt-4">Upload Images</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => handleAdditionalImageChange(section.id, e.target.files)}
                                    className="w-full mt-2 p-2 bg-gray-700 rounded-md"
                                />
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {section?.images?.length > 0 ? (
                                        section?.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                    alt={`Additional ${index}`}
                                                    className="w-full h-32 rounded-md object-cover"
                                                />
                                                <button
                                                    onClick={() => removeImage(section?.id, index)}
                                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-sm"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No Images</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeAdditionalInfoSection(section?.id)}
                                    className="mt-4 text-red-600 hover:underline"
                                >
                                    Remove Section
                                </button>
                            </motion.div>
                        ))}
                        <button
                            onClick={addAdditionalInfoSection}
                            className="mt-4 text-blue-500 hover:underline flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Add Section
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AdminEditProductModal;
