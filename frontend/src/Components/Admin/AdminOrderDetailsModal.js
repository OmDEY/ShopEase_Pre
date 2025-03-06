import React from 'react';
import { motion } from 'framer-motion';

const AdminOrderDetailsModal = ({ order, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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
        <h2 className="text-2xl mb-4 font-bold">Order #{order.id} Details</h2>

        {/* Split Customer Info */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {/* Left Side Customer Details */}
          <div className="space-y-2">
            <p><span className="font-semibold">Customer:</span> {order.customer}</p>
            <p><span className="font-semibold">Email:</span> {order.email}</p>
            <p><span className="font-semibold">Status:</span> {order.status}</p>
          </div>

          {/* Right Side Customer Details */}
          <div className="space-y-2 text-right">
            <p><span className="font-semibold">Date:</span> {order.date}</p>
            <p><span className="font-semibold">Total:</span> ${order.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Items Ordered Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-gray-700 p-4 rounded-lg space-x-4 shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                {/* Product Image */}
                <img
                  src={`https://via.placeholder.com/80?text=${item.name}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <p className="text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-gray-400">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right font-bold text-green-400">
                  ${ (item.quantity * item.price).toFixed(2) }
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminOrderDetailsModal;
