import React from 'react';

const AdminLatestReviewsTable = ({ reviews }) => {
    return (
        <div className='bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full'>
            <h3 className='text-lg font-semibold mb-4'>Latest Customer Reviews</h3>
            <table className='w-full text-left'>
                <thead>
                    <tr className='border-b border-gray-700'>
                        <th className='py-2 px-4'>Customer</th>
                        <th className='py-2 px-4'>Review</th>
                        <th className='py-2 px-4'>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={index} className='border-t border-gray-700 hover:bg-gray-700 transition duration-200'>
                            <td className='py-2 px-4'>{review.customer}</td>
                            <td className='py-2 px-4'>{review.text}</td>
                            <td className={`py-2 px-4 ${
                                review.rating >= 4
                                    ? 'text-green-500'
                                    : review.rating >= 2
                                    ? 'text-yellow-500'
                                    : 'text-red-500'
                            }`}>
                                {review.rating}/5
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLatestReviewsTable;
