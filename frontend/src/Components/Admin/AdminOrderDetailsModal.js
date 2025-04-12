import React from 'react';
import { motion } from 'framer-motion';

const AdminOrderDetailsModal = ({ order, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
      >
        <h2 className="text-3xl mb-6 font-bold border-b pb-4 border-gray-700">
          Order Details<span className="text-green-400"> #{order._id}</span>
        </h2>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-400">Customer:</span> {order.user.firstName} {order.user.name || order.user.lastName || order.user.fullName || 'N/A'}</p>
            <p><span className="font-semibold text-gray-400">Email:</span> {order.user.email}</p>
            <p><span className="font-semibold text-gray-400">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                order.orderStatus === 'Delivered' ? 'bg-green-700 text-green-300' :
                order.orderStatus === 'Cancelled' ? 'bg-red-700 text-red-300' :
                order.orderStatus === 'Shipped' ? 'bg-blue-700 text-blue-300' :
                'bg-yellow-700 text-yellow-300'
              }`}>
                {order.orderStatus}
              </span>
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p><span className="font-semibold text-gray-400">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><span className="font-semibold text-gray-400">Total:</span> ₹{order.totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 p-4 rounded-xl flex items-center space-x-4 shadow-md transition-all duration-300"
              >
                <img
                  src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                  <p className="text-gray-400">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right font-bold text-green-400 text-lg">
                  ${ (item.quantity * item.price).toFixed(2) }
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminOrderDetailsModal;