import React from 'react';

const AdminProductsPunched = ({ products }) => {
    return (
        <div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full overflow-hidden'>
            <h3 className='text-lg font-semibold mb-4'>Latest Products</h3>
            <table className='w-full text-left border-collapse border border-gray-700'>
                <thead>
                    <tr className='bg-gray-700'>
                        <th className='py-2 px-4 border-b border-gray-600'>Product Name</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Date Added</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Units Sold</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Stock Status</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className='hover:bg-gray-700 transition duration-200'>
                            <td className='py-2 px-4 border-t border-gray-600'>{product.name}</td>
                            <td className='py-2 px-4 border-t border-gray-600'>{product.dateAdded}</td>
                            <td className='py-2 px-4 border-t border-gray-600'>{product.unitsSold}</td>
                            <td className={`py-2 px-4 border-t border-gray-600 ${
                                product.stockStatus === 'In Stock'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}>
                                {product.stockStatus}
                            </td>
                            <td className='py-2 px-4 border-t border-gray-600'>${product.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductsPunched;
