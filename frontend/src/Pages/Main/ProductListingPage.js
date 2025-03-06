import React, { useEffect, useState, useContext } from 'react';
import { Range } from 'react-range';
import BigCard from '../../Components/Main/Common/BigCard';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addToCart, fetchAllProducts, fetchProductsFiltered } from '../../services/api';

// Dummy product data
const DummyProducts = [
    { id: 1, title: 'Product 1', images: ['https://via.placeholder.com/400x300'], rating: 4.5, description: 'Product 1 description.', category: 'Brand A', price: 100 },
    { id: 2, title: 'Product 2', images: ['https://via.placeholder.com/400x300'], rating: 4.7, description: 'Product 2 description.', category: 'Brand B', price: 150 },
    { id: 3, title: 'Product 3', images: ['https://via.placeholder.com/400x300'], rating: 4.3, description: 'Product 3 description.', category: 'Brand C', price: 200 },
    { id: 4, title: 'Product 4', images: ['https://via.placeholder.com/400x300'], rating: 4.8, description: 'Product 4 description.', category: 'Brand D', price: 250 },
];

// Dummy filter data
const filters = [
    { id: 1, label: 'Category', options: ['Category 1', 'Category 2', 'Category 3'] },
    { id: 2, label: 'Brand', options: ['Brand A', 'Brand B', 'Brand C'] },
    { id: 3, label: 'Rating', options: ['4 stars & up', '3 stars & up', '2 stars & up'] },
];

const STEP = 10;
const MIN = 0;
const MAX = 200;

const ProductListingPage = () => {
    const { searchTerm } = useContext(SearchContext); // Get searchResults from context
    const [products, setProducts] = useState(DummyProducts);
    const [brands, setBrands] = useState([
        'Brand A',
        'Brand B',
        'Brand C',
        'Brand D',
        'Brand E',
        'Brand F',
        'Brand G',
        'Brand H',
        'Brand I',
        'Brand J',
    ]);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const currentPage = page;
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);

    const [colors, setColors] = useState([
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Orange',
        'Purple',
        'Pink',
        'Brown',
        'Black',
        'White',
    ]);

    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        console.log('clicked on product with id:', productId);
        navigate(`/product?productId=${productId}`);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchProductsFiltered();
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            fetchProductsFiltered();
        }
    };

    const handleAddToCart = (productId) => {
        const quantity = 1;
        addToCart(productId, quantity)
            .then(response => {
                console.log(response.data);
                toast.success(response?.data?.message);
            })
            .catch(error => {
                console.error(error);
                toast.error(error?.response?.data?.message);
            });
    };

    useEffect(() => {
        // If searchResults exist, use them; otherwise, use DummyProducts
        searchProductsFiltered();
    }, [searchTerm]); // Update when searchResults change

    const searchProductsFiltered = () => {
        // Implement your logic to fetch filtered products
        if (Object.keys(searchTerm).length > 0) {
            fetchProductsFiltered(searchTerm, page, limit)
                .then(response => {
                    setProducts(response.data.products);
                    setTotalProducts(response.data.totalProducts);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            fetchAllProducts(page, limit)
                .then(response => {
                    setProducts(response.data.products);
                    setTotalProducts(response.data.totalProducts);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const [values, setValues] = useState([0, 150]);

    return (
        <div className="bg-gray-100 w-full">
            <div className="px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Filters Section */}
                    <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Filters</h2>

                        {/* Category Filter */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Category</h3>
                            <ul className="space-y-2">
                                {filters.map((filter) => (
                                    <li key={filter.id}>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                            <span className="text-gray-600">{filter.label}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Price Range</h3>
                            <Range
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                values={values}
                                onChange={(values) => setValues(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="h-2 bg-gray-300 rounded-full"
                                        style={{
                                            ...props.style,
                                            background: `linear-gradient(to right, #4F46E5 ${100 * (values[0] / MAX)}%, #22C55E ${100 * (values[1] / MAX)}%)`,
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        className="h-4 w-4 bg-blue-500 rounded-full"
                                    />
                                )}
                            />
                            <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>${values[0]}</span>
                                <span>${values[1]}</span>
                            </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Brand</h3>
                            <ul className="space-y-2">
                                {brands.map((brand, idx) => (
                                    <li key={idx}>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                            <span className="text-gray-600">{brand}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Color Filter */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Color</h3>
                            <div className="flex flex-wrap space-x-3">
                                {colors.map((color, idx) => {
                                    // Function to validate the color name
                                    const isColorValid = (color) => {
                                        const s = new Option().style;
                                        s.color = color;
                                        return s.color !== '';
                                    };

                                    // Set a fallback color if the color name is invalid
                                    const circleColor = isColorValid(color) ? color.toLowerCase() : 'gray';

                                    return (
                                        <div key={idx} className="flex items-center mb-2">
                                            <label className="cursor-pointer">
                                                <span
                                                    className="block w-6 h-6 rounded-full border border-gray-200 shadow-md"
                                                    style={{ backgroundColor: circleColor }}
                                                ></span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        {/* Rating Filter */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Rating</h3>
                            <ul className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <li key={rating}>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                            <div className="flex items-center">
                                                {[...Array(rating)].map((_, idx) => (
                                                    <svg
                                                        key={idx}
                                                        className="w-4 h-4 fill-current text-yellow-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L17.82 21 12 17.77 6.18 21 7 14.14l-5-4.87 6.91-1L12 2z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Apply and Clear Buttons */}
                        <div className="flex space-x-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                Apply Filters
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
                                Clear All
                            </button>
                        </div>
                    </div>


                    {/* Right Product Listing Section */}
                    <div className="col-span-3">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <div
                                        key={product?.id}
                                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    >
                                        <img
                                            src={product?.images?.[0]}
                                            alt={product?.title}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3
                                                onClick={() => handleProductClick(product?._id)} // Make sure `product?.id` is correctly accessed 
                                                className="text-lg font-bold mb-2"
                                            >
                                                {product?.title}
                                            </h3>
                                            <p
                                                onClick={() => handleProductClick(product?._id)} // Make sure `product?.id` is correctly accessed
                                                className="text-sm text-gray-700 mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                                {`${product?.description.substring(0, 200)}${product?.description.length > 200 ? '...' : ''}`}
                                            </p>
                                            <p
                                                onClick={() => handleProductClick(product?._id)} // Make sure `product?.id` is correctly accessed
                                                className="text-xs text-gray-500 mb-2"
                                            >
                                                {product?.category}
                                            </p>
                                            <div
                                                onClick={() => handleProductClick(product?._id)} // Make sure `product?.id` is correctly accessed 
                                                className="flex items-center mb-4"
                                            >
                                                <span className="text-yellow-500">
                                                    {'★'.repeat(Math.round(product?.rating || 0))}
                                                    {'☆'.repeat(5 - Math.round(product?.rating || 0))}
                                                </span>
                                                <span className="ml-2 text-gray-500">({product?.rating || 0})</span>
                                            </div>
                                            <span
                                                onClick={() => handleProductClick(product?._id)} // Make sure `product?.id` is correctly accessed 
                                                className="ml-2 text-gray-500"
                                            >
                                                ${product?.price}
                                            </span>
                                            <div className="mt-4 flex justify-between">
                                                <button
                                                    onClick={() => handleAddToCart(product?._id)}
                                                    className="bg-green-500 w-full text-white py-2 px-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-2xl font-bold text-center">
                                No Products Found
                            </div>
                        )}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center rounded-full bg-white shadow-md">
                                <button
                                    onClick={handlePrevPage}
                                    className="px-4 py-2 hover:bg-gray-100 transition duration-300"
                                >
                                    {'<'}
                                </button>
                                {[...Array(Math.ceil(totalProducts / limit)).keys()].map(pageNumber => (
                                    <button
                                        onClick={() => handlePageChange(pageNumber)}
                                        key={pageNumber}
                                        className={`px-4 py-2 hover:bg-gray-100 transition duration-300 ${currentPage === pageNumber ? 'bg-blue-500 text-white rounded-full' : ''}`}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNextPage}
                                    className="px-4 py-2 hover:bg-gray-100 transition duration-300"
                                >
                                    {'>'}
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <BigCard />
        </div>
    );
};

export default ProductListingPage;
