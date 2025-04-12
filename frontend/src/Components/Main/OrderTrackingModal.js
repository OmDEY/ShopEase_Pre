import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const statusSteps = ["Processing", "Shipped", "Delivered"];

const OrderTrackingModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const currentStep = statusSteps.indexOf(order.orderStatus);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-xl mx-4 rounded-2xl shadow-xl p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Tracking Order</h2>

            <div className="mb-6">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Tracking Number:</strong> {order.trackingNumber || "Not Assigned"}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              {order.estimatedDelivery && (
                <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toDateString()}</p>
              )}
            </div>

            {/* Progress Tracker */}
            <div className="flex justify-between items-center mb-6">
              {statusSteps.map((step, index) => (
                <div key={step} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-700">{step}</p>
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-green-500 transition-all"
                style={{
                  width: `${((currentStep + 1) / statusSteps.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Items Summary */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Items in this Order:</h3>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="border p-2 rounded-md shadow-sm">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-600">
                      ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderTrackingModal;