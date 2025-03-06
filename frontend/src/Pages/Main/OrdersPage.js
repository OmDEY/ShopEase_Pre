import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { BsArrowRepeat, BsBoxArrowInUpRight } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

// Sample Orders Data
const ordersData = [
  {
    id: 1,
    date: '2023-09-15',
    total: '$120.99',
    customer: 'John Doe',
    address: '123 Main St, Cityville, CA',
    status: 'Delivered',
    items: [
      { name: 'Laptop', description: 'High-end gaming laptop', price: '$100.00', quantity: 1, image: 'https://via.placeholder.com/100' },
      { name: 'Mouse', description: 'Wireless mouse', price: '$20.99', quantity: 1, image: 'https://via.placeholder.com/100' }
    ]
  },
  {
    id: 2,
    date: '2023-08-21',
    total: '$89.50',
    customer: 'Jane Smith',
    address: '456 Oak St, Townsville, TX',
    status: 'Cancelled',
    items: [
      { name: 'Smartphone', description: 'Latest model smartphone', price: '$89.50', quantity: 1, image: 'https://via.placeholder.com/100' }
    ]
  },
  {
    id: 3,
    date: '2023-07-10',
    total: '$45.00',
    customer: 'Bob Johnson',
    address: '789 Pine St, Hamlet, NY',
    status: 'Not Yet Shipped',
    items: [
      { name: 'Headphones', description: 'Noise-cancelling headphones', price: '$45.00', quantity: 1, image: 'https://via.placeholder.com/100' }
    ]
  }
];

// Sample Related Products Data
const relatedProducts = [
  { id: 1, name: 'Wireless Mouse', price: '$20.00', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Laptop Stand', price: '$35.00', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Smartwatch', price: '$120.00', image: 'https://via.placeholder.com/150' }
];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Past 3 Months');

  // Filter orders by status and time period
  const filteredOrders = ordersData.filter(order => {
    if (activeTab === 'Orders' && order.status === 'Delivered') return true;
    if (activeTab === 'Cancelled Orders' && order.status === 'Cancelled') return true;
    if (activeTab === 'Not Yet Shipped Orders' && order.status === 'Not Yet Shipped') return true;
    return false;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-8 mb-8">
        {['Orders', 'Cancelled Orders', 'Not Yet Shipped Orders'].map(tab => (
          <motion.button
            key={tab}
            className={`text-xl font-semibold pb-2 ${activeTab === tab ? 'border-b-4 border-indigo-600' : ''}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg shadow-lg border-gray-300 focus:border-indigo-500"
            placeholder="Search orders..."
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          className="bg-white text-gray-700 px-4 py-2 rounded-lg border shadow-md focus:outline-none"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Past 3 Months">Past 3 Months</option>
          <option value="Past 6 Months">Past 6 Months</option>
          <option value="Past 12 Months">Past 12 Months</option>
        </select>
      </div>

      {/* Orders List */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            className="bg-white rounded-lg shadow-lg p-6 space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Order Header - Horizontal Layout */}
            <div className="flex justify-between items-center border-b pb-4 space-x-4">
              <p className="font-semibold text-lg flex-1">Order Placed: {order.date}</p>
              <p className="font-semibold text-lg flex-1">Total: {order.total}</p>
              <p className="text-gray-500 flex-1">Ship To: {order.customer}, {order.address}</p>
            </div>

            {/* Items */}
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4 border-b pb-4 last:border-none">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">{item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              {order.status === 'Delivered' && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                  <BsArrowRepeat />
                  <span>Buy Again</span>
                </button>
              )}
              {order.status === 'Delivered' && (
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                  <MdCancel />
                  <span>Return</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Products Related to Your Purchases</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {relatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
              <div className="flex justify-between items-center">
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-700">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;
