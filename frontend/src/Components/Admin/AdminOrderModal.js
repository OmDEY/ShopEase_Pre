import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminOrderModal = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order.orderStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate({ ...order, orderStatus: status });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-2xl mb-6 font-bold">Order #{order._id}</h2>

        {/* Order Items Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4 shadow-md transition-transform duration-300"
              >
                <img
                  src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{item.product.title}</h4>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-gray-400">Price: ₹{item.product.price.toFixed(2)}</p>
                </div>
                <div className="text-right font-bold text-green-400">
                  ₹{(item.quantity * item.product.price).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form to update order status */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Customer</label>
            <input
              type="text"
              value={(order.user?.name || order.user?.firstName || order.user?.fullName) || 'N/A'}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminOrderModal;