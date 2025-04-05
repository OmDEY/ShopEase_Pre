import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar as faSolidStar, faHeart, faGift } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import BigCard from '../../Components/Main/Common/BigCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateCartItem, fetchCart } from '../../services/api';

const CartPage = () => {
    const [items, setItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setIsLoading(true);
        try {
            const response = await fetchCart();
            setItems(response.data.cart.items);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to load cart');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    };

    const calculateDiscountedTotal = () => {
        return calculateTotal() - discount;
    };

    const removeItem = async (id) => {
        try {
            await removeItemFromCart(id);
            toast.success('Item removed from cart');
            fetchCartItems();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to remove item');
        }
    };

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        
        // Optimistic update
        setItems(items.map(item => 
            item.product._id === id ? { ...item, quantity: newQuantity } : item
        ));

        try {
            await updateCartItem(id, newQuantity);
        } catch (error) {
            toast.error("Failed to update quantity");
            fetchCartItems(); // Revert on error
        }
    };

    const applyCoupon = () => {
        // In a real app, you would validate the coupon with your backend
        if (couponCode.toLowerCase() === 'save10') {
            setDiscount(10);
            toast.success('Coupon applied! $10 discount');
        } else if (couponCode.toLowerCase() === 'save20') {
            setDiscount(20);
            toast.success('Coupon applied! $20 discount');
        } else {
            toast.error('Invalid coupon code');
        }
    };

    const displayRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FontAwesomeIcon key={i} icon={faSolidStar} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FontAwesomeIcon key={i} icon={faSolidStar} className="text-yellow-400 opacity-50" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faEmptyStar} className="text-yellow-400" />);
            }
        }

        return (
            <div className="flex items-center space-x-1">
                {stars}
                <span className="ml-2 text-sm text-gray-500">({rating?.toFixed(1) || 0})</span>
            </div>
        );
    };

    const RelatedProductCard = ({ product }) => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="relative">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors">
                    <FontAwesomeIcon icon={faRegularHeart} className="text-red-500" />
                </button>
            </div>
            <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                {displayRating(product.rating)}
                <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-indigo-600">${product.price}</span>
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm hover:bg-indigo-200 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* Main Cart Section */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">
                    Your Shopping Cart
                </h1>
                <p className="text-lg text-gray-500 mb-8">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
                            </div>

                            {isLoading ? (
                                <div className="p-12 text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading your cart...</p>
                                </div>
                            ) : items.length === 0 ? (
                                <div className="p-12 text-center">
                                    <FontAwesomeIcon icon={faHeart} className="text-gray-300 text-5xl mb-4" />
                                    <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
                                    <p className="mt-2 text-gray-500">Start shopping to add items to your cart</p>
                                    <button 
                                        onClick={() => navigate('/products')}
                                        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <li key={item.product?._id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                                                        alt={item.product?.title}
                                                        className="w-32 h-32 object-contain rounded-lg border border-gray-200"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-grow">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {item.product?.title}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeItem(item.product?._id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>

                                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                        {item.product?.description || 'No description available'}
                                                    </p>

                                                    {displayRating(item.product?.rating || 0)}

                                                    <div className={`mt-2 text-sm ${item.product?.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {item.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </div>

                                                    {/* Mobile View: Price and Quantity */}
                                                    <div className="sm:hidden mt-4">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-semibold text-gray-900">
                                                                ${(item.product?.price * item.quantity).toFixed(2)}
                                                            </span>
                                                            <div className="flex items-center border rounded-lg">
                                                                <button
                                                                    onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}
                                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-3">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Desktop View: Price, Quantity, Subtotal */}
                                                <div className="hidden sm:flex flex-col items-end justify-between min-w-[180px]">
                                                    <div className="text-lg font-semibold text-gray-900">
                                                        ${item.product?.price?.toFixed(2) || '0.00'}
                                                    </div>

                                                    <div className="flex items-center border rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="text-lg font-semibold text-gray-900">
                                                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-bold text-lg text-indigo-600">
                                            ${calculateDiscountedTotal().toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Coupon Code */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faGift} className="mr-2 text-indigo-500" />
                                        Apply Coupon Code
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Enter coupon code"
                                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <button
                                            onClick={applyCoupon}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={() => navigate('/checkout')}
                                    disabled={items.length === 0}
                                    className={`mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
                                >
                                    Proceed to Checkout
                                </button>

                                {/* Continue Shopping */}
                                <button
                                    onClick={() => navigate('/products')}
                                    className="mt-4 w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {items.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    name: 'Premium Wireless Headphones',
                                    brand: 'SoundMaster',
                                    price: 199.99,
                                    rating: 4.7,
                                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                                },
                                {
                                    name: 'Smart Fitness Watch',
                                    brand: 'FitTech',
                                    price: 159.99,
                                    rating: 4.5,
                                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                                },
                                {
                                    name: 'Wireless Charging Pad',
                                    brand: 'PowerUp',
                                    price: 39.99,
                                    rating: 4.2,
                                    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                                },
                                {
                                    name: 'Bluetooth Portable Speaker',
                                    brand: 'AudioPro',
                                    price: 129.99,
                                    rating: 4.4,
                                    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                                },
                            ].map((product, index) => (
                                <RelatedProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* BigCard component at the bottom */}
            <div className="max-w-7xl mx-auto mt-12">
                <BigCard />
            </div>
        </div>
    );
};

export default CartPage;