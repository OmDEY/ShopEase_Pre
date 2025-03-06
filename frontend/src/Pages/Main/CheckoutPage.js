import React, { useState, useEffect } from 'react';
// import visaIcon from './assets/visa.png'; // Assume these icons exist in the assets folder
// import masterCardIcon from './assets/mastercard.png'; // For Mastercard
// import productImage from './assets/product.png'; // Placeholder product image
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import axios from 'axios';
import { fetchCart, fetchUserById } from '../../services/api';

const CheckoutPage = () => {
    const [addressExists, setAddressExists] = useState(false); // Toggle between existing and new address
    const [selectedPayment, setSelectedPayment] = useState(''); // To track selected payment method
    const [cartItems, setCartItems] = useState([]); // To track cart items
    const [total, setTotal] = useState(0);


    const [address, setAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
        state: '',
        city: '',
        phoneNumber: '',
    });

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        fetchCart()
            .then((response) => {
                console.log(response.data);
                setCartItems(response.data.cart.items);
                setTotal(response.data.cart.totalPrice);
                // console.log(response.data.cart.items);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        fetchUserById(userId)
            .then((response) => {
                setAddressExists(true);
                if(!response.data.shippingAddress){
                setAddress({
                    addressLine1: '123 Main St',
                    addressLine2: 'Apt 1',
                    postalCode: '12345',
                    state: 'CA',
                    city: 'Cityville',
                    phoneNumber: '123-456-7890',
                });
                }else{
                setAddress({
                    addressLine1: response.data.shippingAddress.addressLine1,
                    addressLine2: response.data.shippingAddress.addressLine2,
                    postalCode: response.data.shippingAddress.postalCode,
                    state: response.data.shippingAddress.state,
                    city: response.data.shippingAddress.city,
                    phoneNumber: response.data.phoneNumber,
                });
            }})
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const saveAddress = () => {
        setAddressExists(true);
    };

    const editAddress = () => {
        setAddressExists(false);
    };

    const handlePaymentChange = (method) => {
        setSelectedPayment(method);
    };

    return (
        <motion.div
            className="checkout-page grid grid-cols-1 lg:grid-cols-3 gap-8 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Left Side - Delivery Address, Payment Method, and Order Details */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">

                {/* Delivery Address Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-4">1. Delivery Address</h2>
                    {!addressExists ? (
                        <div className="address-form">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="line1"
                                    placeholder="Address Line 1"
                                    className="border p-2 rounded-lg"
                                    value={address.addressLine1}
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="line2"
                                    placeholder="Address Line 2"
                                    className="border p-2 rounded-lg"
                                    value={address.addressLine2}
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="pinCode"
                                    placeholder="Pin Code"
                                    className="border p-2 rounded-lg"
                                    value={address.postalCode}
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className="border p-2 rounded-lg"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="border p-2 rounded-lg"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    className="border p-2 rounded-lg"
                                    value={address.phoneNumber}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                onClick={saveAddress}
                            >
                                Save Address
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="font-semibold">{address.addressLine1}</p>
                            <p>{address.addressLine2}<br />
                                {address.city}, {address.state}, {address.postalCode}<br />
                                {address.phoneNumber}</p>
                            <button className="text-blue-500 hover:underline mt-2">Change Address</button>
                        </div>
                    )}
                </div>

                {/* Payment Methods Section */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-4">2. Select a Payment Method</h2>

                    {/* Payment Methods - Vertical radioes */}
                    <div className="grid grid-cols-1 gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2"
                                onChange={() => handlePaymentChange('card')}
                                checked={selectedPayment === 'card'}
                            />
                            Credit/Debit Card
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2"
                                onChange={() => handlePaymentChange('upi')}
                                checked={selectedPayment === 'upi'}
                            />
                            UPI (Razorpay)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2"
                                onChange={() => handlePaymentChange('netbanking')}
                                checked={selectedPayment === 'netbanking'}
                            />
                            Net Banking
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2"
                                onChange={() => handlePaymentChange('cod')}
                                checked={selectedPayment === 'cod'}
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    {/* Payment Details (Based on Selected Method) */}
                    <div className="mt-4">
                        {selectedPayment === 'card' && (
                            <motion.div
                                className="grid grid-cols-2 gap-4"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="flex items-center gap-2">
                                    <img src={"https://img.icons8.com/color/200/visa.png"} alt="Visa" className="w-10 h-auto" />
                                    <img src={"https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png"} alt="MasterCard" className="w-10 h-auto" />
                                    {/* Add more icons as needed */}
                                </div>
                                <br />
                                <input type="text" placeholder="Card Number" className="border p-2 rounded-lg" />
                                <input type="text" placeholder="Cardholder Name" className="border p-2 rounded-lg" />
                                <input type="text" placeholder="Expiry Date (MM/YY)" className="border p-2 rounded-lg" />
                                <input type="text" placeholder="CVV" className="border p-2 rounded-lg" />

                                {/* Previously Used Cards */}
                                <div className="col-span-2">
                                    <p className="font-semibold mb-2">Previously Used Cards</p>
                                    <div className="border p-4 rounded-lg">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            onChange={() => handlePaymentChange('previouseCard')}
                                            checked={selectedPayment === 'previouseCard'}
                                        />
                                        **** **** **** 1234 (Visa)
                                        Expires: 12/25
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {selectedPayment === 'upi' && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="font-semibold">Razorpay UPI</p>
                                <input type="text" placeholder="Enter UPI ID" className="border p-2 rounded-lg w-full" />
                            </motion.div>
                        )}
                        {selectedPayment === 'netbanking' && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="font-semibold">Select Your Bank</p>
                                <select className="border p-2 rounded-lg w-full">
                                    <option value="">Choose a Bank</option>
                                    <option value="sbi">State Bank of India</option>
                                    <option value="hdfc">HDFC Bank</option>
                                    <option value="icici">ICICI Bank</option>
                                    {/* Add more banks as needed */}
                                </select>
                            </motion.div>
                        )}
                    </div>

                    {/* Promo Code Section */}
                    <div className="mt-4">
                        <p className="font-semibold">Apply Promo Code</p>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Enter Promo Code" className="border p-2 rounded-lg flex-grow" />
                            <button className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition-all">Apply</button>
                        </div>
                    </div>
                </div>

                {/* Items and Order Summary */}
                <div>
                    <h2 className="text-lg font-bold mb-4">3. Your Orders</h2>
                    {
                        cartItems.length > 0 ?
                            cartItems.map((item) => (
                                <motion.div
                                    className="flex justify-between p-4 border rounded-lg mb-2"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img src={item?.product?.images[0]} alt="Product" className="w-16 h-auto rounded-lg" />
                                    <div className="flex-grow pl-4">
                                        <p className="font-bold">{item.product.title}</p>
                                        <p className="text-sm text-gray-600">{item.product.description}</p>
                                        <p className="text-sm text-green-600">{item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                        <p className="text-sm text-gray-600">Estimated Delivery: 2-3 business days</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">${item.product.price}</p>
                                        <p className="text-sm">Qty: {item.quantity}</p>
                                    </div>
                                </motion.div>
                            )) :

                            <p>No items in cart</p>
                    }
                    {/* Add more products similarly */}
                </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="mb-4">
                    <p className="flex justify-between"><span>Subtotal</span><span>${total}</span></p>
                    <p className="flex justify-between border-b-2 border-gray-300 pb-4 mt-4"><span>Shipping</span><span>$5.00</span></p>
                    <p className="flex justify-between font-semibold mt-6"><span>Total</span><span>${total + 5}</span></p>
                </div>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Place Order</button>
            </div>
        </motion.div>
    );
};

export default CheckoutPage;
