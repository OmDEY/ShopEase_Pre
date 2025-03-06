import React from 'react';

const AdminLatestTransactionsTable = ({ transactions }) => {
    return (
        <div className='bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full overflow-hidden'>
            <h3 className='text-lg font-semibold mb-4'>Latest Transactions</h3>
            <table className='w-full text-left border-collapse border border-gray-700 rounded-lg'>
                <thead>
                    <tr className='bg-gray-700'>
                        <th className='py-2 px-4 border-b border-gray-600'>Transaction ID</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Date</th>
                        <th className='py-2 px-4 border-b border-gray-600'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className='hover:bg-gray-700 transition duration-200'>
                            <td className='py-2 px-4 border-t border-gray-600'>{transaction.id}</td>
                            <td className='py-2 px-4 border-t border-gray-600'>{transaction.date}</td>
                            <td className='py-2 px-4 border-t border-gray-600'>${transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLatestTransactionsTable;
