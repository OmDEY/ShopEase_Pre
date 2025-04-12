import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiDollarSign,
  FiTruck,
  FiLock,
  FiCheck,
  FiEdit2,
} from "react-icons/fi";
import { fetchCart, fetchUserById, createOrder, verifyPayment, removeItemFromCart } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [addressExists, setAddressExists] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingCost] = useState(5.0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRazorpayPayment = async () => {
    try {

      const userId = localStorage.getItem('userId')

      const { data } = await createOrder(calculateTotal());

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "ShopEase", // your brand name
        description: "Payment for your order",
        image: "/logo.png",
        order_id: data.order.id,
        handler: async function (response) {
          const res = await verifyPayment(response, userId, cartItems, address, calculateTotal());
          if (res.data.success) {
            try {
              await Promise.all(cartItems.map(cartItem => removeItemFromCart(cartItem?.product?._id)));
            } catch (error) {
              console.error("Error removing items from cart:", error);
              toast.error("Error removing items from cart. Please try again later.");
            }
            navigate("/payment-success");
          } else {
            navigate("/payment-failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#1d4ed8",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error starting Razorpay:", err);
    }
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === "razorpay") {
      handleRazorpayPayment();
    }
  };

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    state: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchCartItems();
    fetchUserAddress();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetchCart();
      setCartItems(response.data.cart.items);
      setTotal(response.data.cart.totalPrice);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetchUserById(userId);
      if (response.data.shippingAddress) {
        setAddressExists(true);
        setAddress({
          addressLine1: response.data.shippingAddress.addressLine1,
          addressLine2: response.data.shippingAddress.addressLine2,
          postalCode: response.data.shippingAddress.postalCode,
          state: response.data.shippingAddress.state,
          city: response.data.shippingAddress.city,
          phoneNumber: response.data.phoneNumber,
        });
      } else {
        setAddressExists(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const saveAddress = () => {
    setAddressExists(true);
    // In a real app, you would save this to your backend
  };

  const editAddress = () => {
    setAddressExists(false);
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(10);
      toast.success("Promo code applied! $10 discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const calculateTotal = () => {
    return total + shippingCost - discount;
  };

  const PaymentMethodCard = ({ icon, title, description, value, selected }) => (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition-all ${
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200 hover:border-indigo-300"
      }`}
      onClick={() => handlePaymentChange(value)}
    >
      <div className="flex items-center">
        <div
          className={`p-2 rounded-lg mr-4 ${
            selected
              ? "bg-indigo-100 text-indigo-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {selected && (
          <div className="ml-auto bg-indigo-500 text-white p-1 rounded-full">
            <FiCheck size={14} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Checkout Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                1
              </div>
              <span className="mt-2 text-sm font-medium text-indigo-600">
                Shipping
              </span>
            </div>
            <div className="w-24 h-1 bg-indigo-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedPayment
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  selectedPayment ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                Payment
              </span>
            </div>
            <div className="w-24 h-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                3
              </div>
              <span className="mt-2 text-sm font-medium text-gray-500">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping and Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiTruck className="mr-2 text-indigo-600" />
                  Shipping Information
                </h2>
              </div>

              <div className="p-6">
                {addressExists ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Delivery Address</h3>
                        <p className="text-gray-700 mt-1">
                          {address.addressLine1}
                          <br />
                          {address.addressLine2 && (
                            <>
                              {address.addressLine2}
                              <br />
                            </>
                          )}
                          {address.city}, {address.state} {address.postalCode}
                          <br />
                          Phone: {address.phoneNumber}
                        </p>
                      </div>
                      <button
                        onClick={editAddress}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <FiEdit2 className="mr-1" /> Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={address.addressLine1}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={address.addressLine2}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Apt, suite, unit (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={address.postalCode}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={address.phoneNumber}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={saveAddress}
                      className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Payment Method Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiCreditCard className="mr-2 text-indigo-600" />
                  Payment Method
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <PaymentMethodCard
                    icon={<FiCreditCard size={20} />}
                    title="Credit/Debit Card"
                    description="Pay with Visa, Mastercard, or other cards"
                    value="card"
                    selected={selectedPayment === "card"}
                  />
                  <PaymentMethodCard
                    icon={<FiDollarSign size={20} />}
                    title="UPI Payment"
                    description="Instant payment using UPI apps"
                    value="upi"
                    selected={selectedPayment === "upi"}
                  />
                  <PaymentMethodCard
                    icon={<FiCreditCard size={20} />}
                    title="Net Banking"
                    description="Direct bank transfer"
                    value="netbanking"
                    selected={selectedPayment === "netbanking"}
                  />
                  <PaymentMethodCard
                    icon={<FiTruck size={20} />}
                    title="Cash on Delivery"
                    description="Pay when you receive your order"
                    value="cod"
                    selected={selectedPayment === "cod"}
                  />
                  <PaymentMethodCard
                    icon={<FiLock size={20} />}
                    title="Razorpay Payment"
                    description="Pay with Razorpay"
                    value="razorpay"
                    selected={selectedPayment === "razorpay"}
                  />
                </div>

                {selectedPayment === "card" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://img.icons8.com/color/48/000000/visa.png"
                        alt="Visa"
                        className="h-8"
                      />
                      <img
                        src="https://img.icons8.com/color/48/000000/mastercard.png"
                        alt="Mastercard"
                        className="h-8"
                      />
                      <img
                        src="https://img.icons8.com/color/48/000000/amex.png"
                        alt="Amex"
                        className="h-8"
                      />
                    </div>
                  </motion.div>
                )}

                {selectedPayment === "upi" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <img
                        src="https://img.icons8.com/color/48/000000/google-pay.png"
                        alt="Google Pay"
                        className="h-12"
                      />
                      <img
                        src="https://img.icons8.com/color/48/000000/phonepe.png"
                        alt="PhonePe"
                        className="h-12"
                      />
                      <img
                        src="https://img.icons8.com/color/48/000000/paytm.png"
                        alt="Paytm"
                        className="h-12"
                      />
                      <img
                        src="https://img.icons8.com/color/48/000000/bhim.png"
                        alt="BHIM"
                        className="h-12"
                      />
                    </div>
                  </motion.div>
                )}

                {selectedPayment === "netbanking" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Bank
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Order Review Section */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product?._id}
                        className="flex items-start border-b border-gray-100 pb-4"
                      >
                        <img
                          src={
                            item.product?.images?.[0] ||
                            "https://via.placeholder.com/100"
                          }
                          alt={item.product?.title}
                          className="w-20 h-20 object-contain rounded-lg mr-4"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.product?.title}</h3>
                          <p className="text-sm text-gray-500">
                            {item.product?.description?.substring(0, 50)}...
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(item.product?.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">
                            {item.product?.stock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Promo Code */}
                    <div className="pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Total */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Total</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-indigo-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-4 mt-6 rounded-lg shadow-sm text-lg font-medium text-white ${
                    !selectedPayment
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } transition-colors`}
                  disabled={!selectedPayment}
                  onClick={handlePlaceOrder}
                >
                  <div className="flex items-center justify-center">
                    <FiLock className="mr-2" />
                    Place Order Securely
                  </div>
                </button>

                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <FiLock className="mr-2 text-green-500" />
                  <span>Your payment is securely processed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
