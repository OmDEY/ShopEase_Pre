import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaBoxOpen, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { 
  BsArrowRepeat, 
  BsBoxArrowInUpRight,
  BsClockHistory
} from 'react-icons/bs';
import { 
  MdCancel,
  MdOutlineRateReview,
  MdOutlineContactSupport
} from 'react-icons/md';
import { RiRefund2Line } from 'react-icons/ri';

// Sample Orders Data
const ordersData = [
  {
    id: 1,
    date: '2023-09-15',
    total: '$120.99',
    customer: 'John Doe',
    address: '123 Main St, Cityville, CA',
    status: 'Delivered',
    deliveryDate: '2023-09-18',
    trackingNumber: 'TRK123456789',
    paymentMethod: 'Visa •••• 4242',
    items: [
      { 
        name: 'Laptop Pro X1', 
        description: 'High-end gaming laptop with RTX 3080', 
        price: '$100.00', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      },
      { 
        name: 'Wireless Mouse Elite', 
        description: 'Ergonomic wireless mouse with 12 buttons', 
        price: '$20.99', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      }
    ]
  },
  {
    id: 2,
    date: '2023-08-21',
    total: '$89.50',
    customer: 'Jane Smith',
    address: '456 Oak St, Townsville, TX',
    status: 'Cancelled',
    cancellationDate: '2023-08-22',
    paymentMethod: 'Mastercard •••• 5555',
    items: [
      { 
        name: 'Smartphone Ultra', 
        description: 'Latest model with 108MP camera', 
        price: '$89.50', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      }
    ]
  },
  {
    id: 3,
    date: '2023-07-10',
    total: '$45.00',
    customer: 'Bob Johnson',
    address: '789 Pine St, Hamlet, NY',
    status: 'Processing',
    estimatedDelivery: '2023-07-17',
    paymentMethod: 'PayPal',
    items: [
      { 
        name: 'Noise-Cancelling Headphones', 
        description: '30-hour battery life with ANC', 
        price: '$45.00', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      }
    ]
  },
  {
    id: 4,
    date: '2023-06-05',
    total: '$210.75',
    customer: 'Alice Williams',
    address: '321 Elm St, Villagetown, FL',
    status: 'Shipped',
    shippingDate: '2023-06-07',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2023-06-12',
    paymentMethod: 'Amex •••• 1234',
    items: [
      { 
        name: 'Smart Watch Pro', 
        description: 'Fitness tracking & heart rate monitor', 
        price: '$159.99', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      },
      { 
        name: 'Wireless Charger', 
        description: 'Fast charging pad (15W)', 
        price: '$29.99', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      },
      { 
        name: 'Screen Protector', 
        description: 'Tempered glass (2-pack)', 
        price: '$20.77', 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        rating: 0,
        review: ''
      }
    ]
  }
];

// Sample Related Products Data
const relatedProducts = [
  { 
    id: 1, 
    name: 'Laptop Cooling Pad', 
    price: '$35.00', 
    image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviews: 128
  },
  { 
    id: 2, 
    name: 'Mechanical Keyboard', 
    price: '$89.00', 
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviews: 256
  },
  { 
    id: 3, 
    name: 'Bluetooth Speaker', 
    price: '$59.00', 
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    reviews: 87
  }
];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Past 6 Months');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [itemRatings, setItemRatings] = useState({});
  const [itemReviews, setItemReviews] = useState({});

  // Filter orders by status and time period
  const filteredOrders = ordersData.filter(order => {
    // Search filter
    const matchesSearch = order.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm));
    
    // Tab filter
    const matchesTab = 
      activeTab === 'All' ||
      (activeTab === 'Delivered' && order.status === 'Delivered') ||
      (activeTab === 'Cancelled' && order.status === 'Cancelled') ||
      (activeTab === 'Processing' && order.status === 'Processing') ||
      (activeTab === 'Shipped' && order.status === 'Shipped');
    
    return matchesSearch && matchesTab;
  });

  const handleRateItem = (orderId, itemIndex, rating) => {
    setItemRatings(prev => ({
      ...prev,
      [`${orderId}-${itemIndex}`]: rating
    }));
  };

  const handleReviewChange = (orderId, itemIndex, review) => {
    setItemReviews(prev => ({
      ...prev,
      [`${orderId}-${itemIndex}`]: review
    }));
  };

  const submitReview = (orderId, itemIndex) => {
    // In a real app, you would send this to your backend
    console.log(`Review submitted for order ${orderId}, item ${itemIndex}:`, {
      rating: itemRatings[`${orderId}-${itemIndex}`],
      review: itemReviews[`${orderId}-${itemIndex}`]
    });
    alert('Review submitted successfully!');
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500 text-xl mr-2" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500 text-xl mr-2" />;
      case 'Processing':
        return <BsClockHistory className="text-yellow-500 text-xl mr-2" />;
      case 'Shipped':
        return <FaTruck className="text-blue-500 text-xl mr-2" />;
      default:
        return <FaBoxOpen className="text-gray-500 text-xl mr-2" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Orders</h1>
          <p className="text-gray-600">View and manage all your recent purchases</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'].map(tab => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search orders or items..."
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-gray-600 whitespace-nowrap">Time period:</span>
            <select
              className="bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="Past 3 Months">Past 3 Months</option>
              <option value="Past 6 Months">Past 6 Months</option>
              <option value="Past 12 Months">Past 12 Months</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any orders matching your criteria</p>
            <button 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              onClick={() => {
                setActiveTab('All');
                setSearchTerm('');
              }}
            >
              View All Orders
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Order Header */}
                <div 
                  className={`p-4 md:p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer ${getStatusColor(order.status)}`}
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-bold">Order #{order.id}</h3>
                      <p className="text-sm">Placed on {order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <p className="font-bold text-lg">{order.total}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingNumber && (
                        <button className="text-xs text-indigo-600 hover:underline flex items-center">
                          Track <BsBoxArrowInUpRight className="ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <motion.div 
                    className="p-4 md:p-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Order Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-gray-700">Shipping Address</h4>
                        <p className="text-gray-600">{order.customer}</p>
                        <p className="text-gray-600">{order.address}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-gray-700">Payment Method</h4>
                        <p className="text-gray-600">{order.paymentMethod}</p>
                        {order.status === 'Delivered' && (
                          <button className="mt-2 text-indigo-600 text-sm hover:underline flex items-center">
                            View invoice <BsBoxArrowInUpRight className="ml-1" />
                          </button>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-gray-700">Delivery Info</h4>
                        {order.status === 'Delivered' ? (
                          <p className="text-gray-600">Delivered on {order.deliveryDate}</p>
                        ) : order.status === 'Shipped' ? (
                          <p className="text-gray-600">Estimated delivery: {order.estimatedDelivery}</p>
                        ) : order.status === 'Processing' ? (
                          <p className="text-gray-600">Preparing for shipment</p>
                        ) : (
                          <p className="text-gray-600">Order {order.status.toLowerCase()}</p>
                        )}
                        {order.trackingNumber && (
                          <p className="text-gray-600">Tracking #: {order.trackingNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-4 text-gray-700 border-b pb-2">Order Items</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 border-b last:border-none hover:bg-gray-50 rounded-lg transition-colors">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-24 h-24 object-contain rounded-lg border border-gray-200" 
                          />
                          
                          <div className="flex-1">
                            <h5 className="font-semibold">{item.name}</h5>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <p className="text-gray-700">${parseFloat(item.price.replace('$', '')).toFixed(2)} × {item.quantity}</p>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <p className="font-semibold text-lg mb-2">{item.price}</p>
                            
                            {order.status === 'Delivered' && (
                              <div className="flex flex-col gap-2 w-full md:w-64">
                                {(!itemRatings[`${order.id}-${idx}`] || itemRatings[`${order.id}-${idx}`] === 0) ? (
                                  <>
                                    <div className="flex justify-center gap-1">
                                      {[1, 2, 3, 4, 5].map(star => (
                                        <button 
                                          key={star} 
                                          onClick={() => handleRateItem(order.id, idx, star)}
                                          className="text-yellow-400 hover:text-yellow-500"
                                        >
                                          <FaRegStar className="text-xl" />
                                        </button>
                                      ))}
                                    </div>
                                    <button 
                                      className="text-sm text-indigo-600 hover:underline flex items-center justify-center"
                                      onClick={() => setItemReviews(prev => ({
                                        ...prev,
                                        [`${order.id}-${idx}`]: ''
                                      }))}
                                    >
                                      Write a review <MdOutlineRateReview className="ml-1" />
                                    </button>
                                  </>
                                ) : (
                                  <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          i < itemRatings[`${order.id}-${idx}`] ? 
                                            <FaStar key={i} className="text-yellow-400" /> : 
                                            <FaRegStar key={i} className="text-yellow-400" />
                                        ))}
                                      </div>
                                      <button 
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                        onClick={() => handleRateItem(order.id, idx, 0)}
                                      >
                                        Change
                                      </button>
                                    </div>
                                    
                                    {itemReviews[`${order.id}-${idx}`] !== undefined && (
                                      <div className="mt-2">
                                        <textarea
                                          value={itemReviews[`${order.id}-${idx}`] || ''}
                                          onChange={(e) => handleReviewChange(order.id, idx, e.target.value)}
                                          placeholder="Share your experience with this product..."
                                          className="w-full p-2 border rounded text-sm mb-2"
                                          rows="3"
                                        />
                                        <div className="flex justify-end gap-2">
                                          <button 
                                            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => {
                                              handleRateItem(order.id, idx, 0);
                                              handleReviewChange(order.id, idx, undefined);
                                            }}
                                          >
                                            Cancel
                                          </button>
                                          <button 
                                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                            onClick={() => submitReview(order.id, idx)}
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3 justify-end">
                      {order.status === 'Delivered' && (
                        <>
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md">
                            <BsArrowRepeat /> Buy Again
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md">
                            <MdOutlineRateReview /> Write Review
                          </button>
                          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 shadow-md">
                            <RiRefund2Line /> Return Item
                          </button>
                        </>
                      )}
                      {order.status === 'Shipped' && (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                            <FaTruck /> Track Package
                          </button>
                        </>
                      )}
                      {order.status === 'Processing' && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md">
                          <MdCancel /> Cancel Order
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 shadow-md">
                        <MdOutlineContactSupport /> Get Help
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Related Products Section */}
        {filteredOrders.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recommended For You</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {relatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(product.rating) ? 
                          <FaStar key={i} className="text-yellow-400" /> : 
                          <FaRegStar key={i} className="text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800 mb-3">{product.price}</p>
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;