import React, { useEffect, useState, useContext } from 'react';
import { Range } from 'react-range';
import BigCard from '../../Components/Main/Common/BigCard';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addToCart, fetchAllProducts, fetchProductsFiltered, fetchOptions, fetchProductsOnFilter } from '../../services/api';
import Filters from '../../Pages/Main/Filters';

// Dummy product data
const DummyProducts = [
    { id: 1, title: 'Product 1', images: ['https://via.placeholder.com/400x300'], rating: 4.5, description: 'Product 1 description.', category: 'Brand A', price: 100 },
    { id: 2, title: 'Product 2', images: ['https://via.placeholder.com/400x300'], rating: 4.7, description: 'Product 2 description.', category: 'Brand B', price: 150 },
    { id: 3, title: 'Product 3', images: ['https://via.placeholder.com/400x300'], rating: 4.3, description: 'Product 3 description.', category: 'Brand C', price: 200 },
    { id: 4, title: 'Product 4', images: ['https://via.placeholder.com/400x300'], rating: 4.8, description: 'Product 4 description.', category: 'Brand D', price: 250 },
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
    const [categories, setCategories] = useState([]); 

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
        searchFilters();
    }, [searchTerm]); // Update when searchResults change

    useEffect(() => {
        // Extract unique category names from the products
        const uniqueCategories = products?.length ? [...new Set(products?.map(product => product?.category))] : [];
        console.log('uniqueCategories', uniqueCategories);
        setCategories(uniqueCategories);
    }, [products]);

    const searchFilters = () => {
        fetchOptions()
            .then(response => {
                setFilterOptions(response.data.filters);
            })
            .catch(error => {
                console.error(error);
            });
    };

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

    const handleFilterApply = async (formattedFilters) => {
        const response = await fetchProductsOnFilter(formattedFilters);
        console.log("Filters applied successfully", response.data);
        setProducts(response?.data?.data);
        setTotalProducts(response?.data?.data?.length);
    };

    const [values, setValues] = useState([0, 150]);

    return (
        <div className="bg-gray-100 w-full">
            <div className="px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Filters Section */}
                    
                    <Filters filtersData={filterOptions} categories={categories} handleFilterApply={handleFilterApply} /> 


                    {/* Right Product Listing Section */}
                    <div className="col-span-3">
                        {products?.length > 0 ? (
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
                                                {product?.category?.categoryName}
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
                                {typeof totalProducts === 'number' && totalProducts > 0 && limit > 0 ? (
                                    [...Array(Math.ceil(totalProducts / limit)).keys()].map(pageNumber => (
                                        <button
                                            onClick={() => handlePageChange(pageNumber)}
                                            key={pageNumber}
                                            className={`px-4 py-2 hover:bg-gray-100 transition duration-300 ${currentPage === pageNumber ? 'bg-blue-500 text-white rounded-full' : ''}`}
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    ))
                                ) : (
                                    <span className="px-4 py-2">
                                        No pages to navigate
                                    </span>
                                )}
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
