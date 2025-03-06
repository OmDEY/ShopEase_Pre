import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import BigCard from '../../Components/Main/Common/BigCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateCartItem, fetchCart } from '../../services/api';

// Dummy data for cart items
const cartItems = [
    {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/100',
        price: 100,
        quantity: 1,
        rating: 4.5,
        inStock: true,
        description: 'This is a description for Product 1', // Added description
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 150,
        quantity: 2,
        rating: 4.0,
        inStock: true,
        description: 'This is a description for Product 2', // Added description
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 150,
        quantity: 2,
        rating: 4.0,
        inStock: true,
        description: 'This is a description for Product 2', // Added description
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 150,
        quantity: 2,
        rating: 4.0,
        inStock: true,
        description: 'This is a description for Product 2', // Added description
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 150,
        quantity: 2,
        rating: 4.0,
        inStock: true,
        description: 'This is a description for Product 2', // Added description
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 150,
        quantity: 2,
        rating: 4.0,
        inStock: true,
        description: 'This is a description for Product 2', // Added description
    },
    // Add more items...
];

const relatedProducts = [
    {
        name: 'Related Product 1',
        brand: 'Brand Z',
        price: 220,
        rating: 4.3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s',
    },
    {
        name: 'Related Product 2',
        brand: 'Brand W',
        price: 270,
        rating: 4.1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s',
    },
];

const CartPage = () => {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        fetchCart()
            .then((response) => {
                console.log(response.data);
                setItems(response.data.cart.items);
                console.log(response.data.cart.items);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Function to calculate total price
    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Function to remove item from cart
    const removeItem = (id) => {
        removeItemFromCart(id)
            .then((response) => {
                console.log(response.data);
                fetchCartItems();
                toast.success(response?.data?.message);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                console.log(error);
            });
    };

    // Function to update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // Ensure quantity does not go below 1
        // Update the state optimistically
        setItems(items.map((item) => (item.product._id === id ? { ...item, quantity: newQuantity } : item)));

        // Make an API call to update the quantity in the backend
        updateCartItem(id, newQuantity)
            .then((response) => {
                fetchCartItems();
            })
            .catch((error) => {
                toast.error("Failed to update quantity");
                console.log(error);
            });
    };

    // Function to display rating in stars and numbers
    const displayRating = (rating) => {
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex items-center">
                {Array.from({ length: filledStars }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faSolidStar} className="text-yellow-500" />
                ))}
                {hasHalfStar && <FontAwesomeIcon icon={faSolidStar} className="text-yellow-500 opacity-50" />}
                {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faEmptyStar} className="text-yellow-500" />
                ))}
                <span className="ml-2 text-gray-600">({rating})</span>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-100">
                {/* Cart Items Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Your Cart</h2>

                    {/* Cart Table */}
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="text-left text-gray-700 font-semibold border-b">
                                <th className="p-4">Product</th>
                                <th className="p-4">Unit Price</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Subtotal</th>
                                <th className="p-4">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items === null || items.length === 0 ? <tr><td colSpan={5}>No items in cart</td></tr> : items?.map((item) => (
                                <tr key={item.product?._id} className="border-b hover:bg-gray-50 transition duration-300">
                                    {/* Product Info */}
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={item?.product?.images[0]} alt={item?.product?.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900">{item?.product?.title}</p>
                                            <p className="text-sm text-gray-600">{item?.product?.description}</p> {/* Added description */}
                                            {displayRating(item?.product?.rating)}
                                            <p className={item?.product?.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                                {item?.product?.stock ? 'In Stock' : 'Out of Stock'}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Unit Price */}
                                    <td className="p-4 text-lg font-semibold text-gray-800">${item?.product?.price}</td>

                                    {/* Quantity Selector */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item?.product?._id, item?.quantity - 1)}
                                                className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span>{item?.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item?.product?._id, item?.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    {/* Subtotal */}
                                    <td className="p-4 text-lg font-semibold text-gray-800">${item?.price * item?.quantity}</td>

                                    {/* Remove Button */}
                                    <td className="p-4">
                                        <button
                                            onClick={() => removeItem(item?.product?._id)}
                                            className="text-red-600 hover:text-red-800 transition-colors duration-300"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cart Total Section */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 h-full lg:min-h-[500px]">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between text-lg font-semibold text-gray-700">
                            <p>Subtotal</p>
                            <p>${calculateTotal()}</p>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-700">
                            <p>Discount</p>
                            <p>-$10</p>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-700">
                            <p>Total</p>
                            <p>${calculateTotal() - 10}</p>
                        </div>

                        {/* Gift Coupon Section */}
                        <div className="mt-6">
                            <label className="block text-gray-700 font-semibold mb-2">Have a gift coupon?</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg shadow-md"
                                placeholder="Enter your coupon code"
                            />
                            <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                                Apply Coupon
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                if (window.location.pathname !== '/checkout') {
                                    navigate('/checkout')
                                }
                            }}
                            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            <div className="ml-12 mr-12 mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    {relatedProducts.map((product, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-lg flex-shrink-0 w-64">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                            {displayRating(product.rating)}
                            <p className="text-lg font-semibold text-gray-800 mt-2">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <BigCard />
        </>
    );
};

export default CartPage;
