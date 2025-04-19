import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiRefreshCw, FiSearch, FiFilter, FiChevronDown, FiChevronUp, 
  FiCheck, FiX, FiTruck, FiDollarSign, FiImage, FiMail, FiPhone 
} from 'react-icons/fi';
import { 
  FaBoxOpen, FaRegSadTear, FaRegSmile, FaRegClock, 
  FaExclamationTriangle, FaShippingFast 
} from 'react-icons/fa';
import { getAllReturnRequests, updateReturnRequestStatus } from '../../services/api';
import { toast } from 'react-toastify';
import moment from 'moment';

const ReturnStatusBadge = ({ status }) => {
  const statusStyles = {
    Requested: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-blue-100 text-blue-800',
    Rejected: 'bg-red-100 text-red-800',
    Returned: 'bg-purple-100 text-purple-800',
    Refunded: 'bg-green-100 text-green-800',
    None: 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    Requested: <FaRegClock className="mr-1" />,
    Approved: <FaRegSmile className="mr-1" />,
    Rejected: <FaRegSadTear className="mr-1" />,
    Returned: <FaShippingFast className="mr-1" />,
    Refunded: <FiDollarSign className="mr-1" />,
    None: <FaBoxOpen className="mr-1" />
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {statusIcons[status]}
      {status}
    </div>
  );
};

const ReturnRequestCard = ({ request, onStatusUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const handleStatusUpdate = async (newStatus) => {
    setActionLoading(true);
    try {
      const response = await updateReturnRequestStatus(
        request.orderId, 
        request.product._id, 
        newStatus,
        adminNotes
      );
      
      onStatusUpdate(request.orderId, newStatus);
      toast.success(`Return ${newStatus.toLowerCase()} successfully`);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Failed to update status: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusActions = () => {
    switch (request.returnStatus) {
      case 'Requested':
        return (
          <>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStatusUpdate('Approved')}
              disabled={actionLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 disabled:opacity-70"
            >
              {actionLoading ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <>
                  <FiCheck /> Approve Return
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStatusUpdate('Rejected')}
              disabled={actionLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center space-x-2 disabled:opacity-70"
            >
              {actionLoading ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <>
                  <FiX /> Reject Return
                </>
              )}
            </motion.button>
          </>
        );
      case 'Approved':
        return (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatusUpdate('Returned')}
            disabled={actionLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center space-x-2 disabled:opacity-70"
          >
            {actionLoading ? (
              <FiRefreshCw className="animate-spin" />
            ) : (
              <>
                <FiTruck /> Mark as Returned
              </>
            )}
          </motion.button>
        );
      case 'Returned':
        return (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatusUpdate('Refunded')}
            disabled={actionLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 disabled:opacity-70"
          >
            {actionLoading ? (
              <FiRefreshCw className="animate-spin" />
            ) : (
              <>
                <FiDollarSign /> Process Refund
              </>
            )}
          </motion.button>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border-l-4"
      style={{ borderLeftColor: 
        request.returnStatus === 'Requested' ? '#f59e0b' :
        request.returnStatus === 'Approved' ? '#3b82f6' :
        request.returnStatus === 'Rejected' ? '#ef4444' :
        request.returnStatus === 'Returned' ? '#8b5cf6' :
        request.returnStatus === 'Refunded' ? '#10b981' : '#9ca3af'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            {request.product?.images?.[0] ? (
              <img 
                src={request.product.images[0]} 
                alt={request.product.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBoxOpen className="text-gray-400 text-xl" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{request.product?.title || 'Unknown Product'}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Order #{request.orderId.slice(-6)}</span>
              <span>•</span>
              <span>{moment(request.returnRequestDate).fromNow()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ReturnStatusBadge status={request.returnStatus} />
          <div className="text-gray-400">
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Return Details</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Request Date:</span>
                      <span className="text-gray-800">
                        {moment(request.returnRequestDate).format('lll')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reason:</span>
                      <span className="text-gray-800">{request.returnReason}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Additional Info:</span>
                      <span className="text-gray-800">
                        {request.additionalInfo || 'None provided'}
                      </span>
                    </div>
                    
                    {request.returnStatus === 'Rejected' && request.adminNotes && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rejection Reason:</span>
                        <span className="text-gray-800">{request.adminNotes}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Return Images */}
                  {request.returnImages?.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FiImage className="mr-1" /> Customer Images ({request.returnImages.length})
                      </h5>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {request.returnImages.map((img, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 rounded-md border border-gray-200 overflow-hidden flex-shrink-0 relative"
                          >
                            <img 
                              src={img.url} 
                              alt={`Return proof ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Column */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Customer & Order Details</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer:</span>
                      <span className="text-gray-800 text-right">
                        {request.user?.firstName || 'Unknown User'}
                        <div className="flex items-center justify-end space-x-2 mt-1">
                          <a href={`mailto:${request.user?.email}`} className="text-blue-500 hover:underline flex items-center">
                            <FiMail className="mr-1" /> Email
                          </a>
                        </div>
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Order Date:</span>
                      <span className="text-gray-800">
                        {moment(request.orderDate).format('lll')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="text-gray-800">{request.quantity}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="text-gray-800">₹{request.price.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping Address:</span>
                      <span className="text-gray-800 text-right">
                        {request.shippingAddress?.city}, {request.shippingAddress?.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Notes and Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                {(request.returnStatus === 'Requested' || request.returnStatus === 'Approved') && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Notes {request.returnStatus === 'Requested' && '(Optional)'}
                    </label>
                    <textarea
                      className="w-full p-2 border rounded text-sm mb-2"
                      placeholder={request.returnStatus === 'Requested' ? 
                        "Add notes for the customer (visible if rejected)" : 
                        "Add internal notes about this return"}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows="2"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap justify-end gap-3">
                  {getStatusActions()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AdminReturnsPage = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    fetchReturns();
  }, [timeRange]);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllReturnRequests({
        status: statusFilter === 'All' ? undefined : statusFilter,
        timeRange: timeRange
      });
      setReturnRequests(response.returnRequests || []);
    } catch (err) {
      console.error('Error fetching returns:', err);
      setError(err.message);
      toast.error(`Failed to load returns: ${err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchReturns();
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setReturnRequests(prev => 
      prev.map(request => {
        if (request.orderId === orderId) {
          return {
            ...request,
            returnStatus: newStatus,
            ...(newStatus === 'Approved' && { returnApprovalDate: new Date() }),
            ...(newStatus === 'Refunded' && { refundDate: new Date() })
          };
        }
        return request;
      })
    );
  };

  const filteredRequests = returnRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.orderId.includes(searchTerm) ||
      request.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.returnReason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.user?.firstName + ' ' + request.user?.lastName).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || 
      request.returnStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = returnRequests.reduce((acc, request) => {
    const status = request.returnStatus;
    acc[status] = (acc[status] || 0) + 1;
    acc['All'] = (acc['All'] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Returns Management</h1>
            <p className="text-gray-600">Review and process customer return requests</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRefresh}
              className="px-4 py-2 bg-white shadow rounded-lg flex items-center space-x-2"
            >
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {['All', 'Requested', 'Approved', 'Rejected', 'Returned', 'Refunded'].map(status => (
            <motion.div 
              key={status}
              whileHover={{ y: -5 }}
              className={`p-4 rounded-xl shadow-md cursor-pointer transition-all ${
                statusFilter === status ? 'bg-indigo-600 text-white' : 'bg-white hover:shadow-lg'
              }`}
              onClick={() => {
                setStatusFilter(status);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{status}</p>
                  <p className="text-2xl font-bold">{statusCounts[status] || 0}</p>
                </div>
                <div className="text-2xl">
                  {status === 'Requested' && <FaRegClock />}
                  {status === 'Approved' && <FaRegSmile />}
                  {status === 'Rejected' && <FaRegSadTear />}
                  {status === 'Returned' && <FiTruck />}
                  {status === 'Refunded' && <FiDollarSign />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by order ID, product, reason or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <FiFilter className="text-gray-500" />
                <span className="text-sm text-gray-700">Status: {statusFilter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg"
          >
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error loading return requests</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Requests List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <FaBoxOpen className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No return requests found
            </h3>
            <p className="text-gray-500">
              {statusFilter === 'All' 
                ? "There are currently no return requests."
                : `There are no ${statusFilter.toLowerCase()} return requests.`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredRequests.map(request => (
                <ReturnRequestCard
                  key={request.orderId}
                  request={request}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReturnsPage;