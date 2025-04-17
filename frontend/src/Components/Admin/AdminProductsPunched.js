import React from 'react';
import { motion } from 'framer-motion';

const AdminProductsPunched = ({ products }) => {
    return (
        <div className='bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 rounded-2xl shadow-xl'>
            <div className="flex items-center justify-between mb-6">
                <h3 className='text-lg font-bold'>
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 w-1 h-6 mr-3 rounded-full inline-block"></span>
                    Latest Products
                </h3>
                <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                    View All
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className='w-full text-left'>
                    <thead>
                        <tr className='border-b border-gray-600'>
                            <th className='py-3 px-4 text-gray-400 font-medium uppercase text-sm'>Product</th>
                            <th className='py-3 px-4 text-gray-400 font-medium uppercase text-sm'>Added</th>
                            <th className='py-3 px-4 text-gray-400 font-medium uppercase text-sm'>Sold</th>
                            <th className='py-3 px-4 text-gray-400 font-medium uppercase text-sm'>Status</th>
                            <th className='py-3 px-4 text-gray-400 font-medium uppercase text-sm'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <motion.tr 
                                key={index} 
                                className='border-b border-gray-700 hover:bg-gray-700/50'
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <td className='py-3 px-4 font-medium'>{product.name}</td>
                                <td className='py-3 px-4 text-gray-400'>{product.dateAdded}</td>
                                <td className='py-3 px-4'>{product.unitsSold}</td>
                                <td className={`py-3 px-4 font-medium ${
                                    product.stockStatus === 'In Stock'
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                }`}>
                                    <span className="inline-flex items-center">
                                        {product.stockStatus === 'In Stock' ? (
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                        ) : (
                                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                        )}
                                        {product.stockStatus}
                                    </span>
                                </td>
                                <td className='py-3 px-4 font-medium'>${product.price.toFixed(2)}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductsPunched;