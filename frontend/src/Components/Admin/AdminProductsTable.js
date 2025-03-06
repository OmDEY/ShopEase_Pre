import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AdminEditProductModal from './AdminEditProductModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { adminDeleteProduct, fetchAllProducts } from '../../services/api';

// Main Table Component
const AdminProductsTable = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handleProductDelete = async (productId) => {
        try {
            const response = adminDeleteProduct(productId);
            if (response.status === 200) {
                toast.success('Product deleted successfully');
            }

            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete product');
        }
    }

    const handlePreviousPage = () => {
        setPage(page - 1);
    }

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const fetchProducts = async () => {
        const response = await fetchAllProducts(page, 5);
        const data = await response.data;
        setProducts(data.products);
        setTotalPages(Math.ceil((data.totalProducts) / 5));
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        fetchProducts();
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl text-center text-white font-bold mb-6">Latest Added Products</h1>
                    <div className="flex justify-end mb-4">
                        <button onClick={fetchProducts} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <FaSyncAlt size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-gray-300">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-4">Product Title</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <motion.tr
                                    key={product._id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                                        } hover:bg-gray-600 transition-all duration-300`}
                                >
                                    <td className="px-6 py-4">{product.title}</td>
                                    <td className="px-6 py-4 truncate max-w-xs">{product.description}</td>
                                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4 capitalize">{product.category}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-4">
                                            <button
                                                onClick={() => openModal(product)}
                                                className="text-blue-500 hover:text-blue-400"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button onClick={() => handleProductDelete(product._id)} className="text-red-500 hover:text-red-400">
                                                <FaTrashAlt size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center py-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <p className="text-white">
                            Page {page} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AdminEditProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    categories={['electronics', 'clothing', 'furniture', 'jwellery']}
                />
            )}
        </div>
    );
};

export default AdminProductsTable;