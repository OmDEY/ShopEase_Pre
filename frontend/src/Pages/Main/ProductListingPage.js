import React, { useEffect, useState, useContext } from 'react';
import { Range } from 'react-range';
import BigCard from '../../Components/Main/Common/BigCard';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addToCart, fetchAllProducts, fetchProductsFiltered, fetchOptions, fetchProductsOnFilter, toggleWishlistItem } from '../../services/api';
import Filters from '../../Pages/Main/Filters';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaHeart, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

// Dummy product data
const DummyProducts = [
    { id: 1, title: 'Premium Wireless Headphones', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], rating: 4.5, description: 'Noise cancelling wireless headphones with 30hr battery life.', category: 'Electronics', price: 199.99, discount: 15 },
    { id: 2, title: 'Smart Fitness Watch', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], rating: 4.7, description: 'Track your heart rate, steps, and sleep patterns with this smart watch.', category: 'Wearables', price: 149.99, discount: 10 },
    { id: 3, title: 'Organic Cotton T-Shirt', images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], rating: 4.3, description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton.', category: 'Apparel', price: 29.99, isNew: true },
    { id: 4, title: 'Stainless Steel Water Bottle', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], rating: 4.8, description: 'Keep your drinks hot or cold for hours with this durable bottle.', category: 'Accessories', price: 24.99, bestSeller: true },
];

const STEP = 10;
const MIN = 0;
const MAX = 200;

const ProductListingPage = () => {
    const { searchTerm } = useContext(SearchContext);
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
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        console.log('page handling clicked')
        console.log('totalPages >>> ', totalPages)
        console.log('page >>> ', page)
        if (page < totalPages) {
            console.log('came inside if')
            setPage(page + 1);
            fetchProductsFiltered();
        }
    };

    const handleAddToCart = (productId, e) => {
        e.stopPropagation();
        const quantity = 1;
        addToCart(productId, quantity)
            .then(response => {
                toast.success(response?.data?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(error => {
                toast.error(error?.response?.data?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    const toggleWishlist = async (productId, e) => {
        e.stopPropagation();
    
        const userId = localStorage.getItem('userId');
    
        try {
            const res = await toggleWishlistItem(userId, productId); // API call
            const updatedWishlist = res.data.wishlist.products;
    
            setWishlist(updatedWishlist);
    
            if (updatedWishlist.includes(productId)) {
                toast.success('Added to wishlist', {
                    position: "top-right",
                    autoClose: 1500,
                });
            } else {
                toast.info('Removed from wishlist', {
                    position: "top-right",
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1500,
            });
        }
    };
    

    useEffect(() => {
        searchProductsFiltered();
        searchFilters();
    }, [searchTerm]);

    useEffect(() => {
        if (!products?.length) return;
      
        const categoryMap = new Map();
      
        products.forEach(product => {
          const cat = product.category;
          if (!categoryMap.has(cat._id)) {
            categoryMap.set(cat._id, cat); // store category object keyed by its _id
          }
        });
      
        const uniqueCategories = Array.from(categoryMap.values());
      
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
        setIsLoading(true);
        if (Object.keys(searchTerm).length > 0) {
            fetchProductsFiltered(searchTerm, page, limit)
                .then(response => {
                    setProducts(response.data.products);
                    setTotalProducts(response.data.totalProducts);
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => setIsLoading(false));
        } else {
            fetchAllProducts(page, limit)
                .then(response => {
                    setProducts(response.data.products);
                    setTotalProducts(response.data.totalProducts);
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const handleFilterApply = async (formattedFilters) => {
        setIsLoading(true);
        try {
            const response = await fetchProductsOnFilter(formattedFilters);
            setProducts(response?.data?.data);
            setTotalProducts(response?.data?.data?.length);
        } catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const [values, setValues] = useState([0, 150]);

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        
        return stars;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 lg:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Filters Section */}
                    <div className="lg:w-1/4">
                        <Filters 
                            filtersData={filterOptions} 
                            categories={categories} 
                            handleFilterApply={handleFilterApply} 
                        />
                    </div>

                    {/* Right Product Listing Section */}
                    <div className="lg:w-3/4">
                        {/* Results Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                                {searchTerm ? `Search Results for "${searchTerm}"` : 'Our Products'}
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({totalProducts} products)
                                </span>
                            </h2>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                                    <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest Arrivals</option>
                                        <option>Best Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                                        <div className="bg-gray-200 h-48 w-full"></div>
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products?.length > 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {products.map((product) => (
                                    <motion.div
                                        key={product?.id}
                                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer relative"
                                        onClick={() => handleProductClick(product?._id)}
                                    >
                                        {/* Product Badges */}
                                        {product.discount && (
                                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                -{product.discount}%
                                            </div>
                                        )}
                                        {product.isNew && (
                                            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                New
                                            </div>
                                        )}
                                        {product.bestSeller && (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                Bestseller
                                            </div>
                                        )}

                                        {/* Wishlist Button */}
                                        <button 
                                            onClick={(e) => toggleWishlist(product._id, e)}
                                            className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                                        >
                                            {wishlist.includes(product.id) ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FiHeart className="text-gray-400 hover:text-red-500" />
                                            )}
                                        </button>

                                        {/* Product Image */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={product?.images?.[0]}
                                                alt={product?.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                                    {product?.title}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-xs text-gray-500 mb-2">
                                                {product?.category?.categoryName || product?.category}
                                            </p>
                                            
                                            <div className="flex items-center mb-2">
                                                <div className="flex mr-1">
                                                    {renderRatingStars(product?.rating || 0)}
                                                </div>
                                                <span className="text-xs text-gray-500">({product?.rating || 0})</span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-3">
                                                <div>
                                                    {product.discount ? (
                                                        <>
                                                            <span className="text-lg font-bold text-gray-800">
                                                                ${(product.price * (1 - product.discount/100)).toFixed(2)}
                                                            </span>
                                                            <span className="text-xs text-gray-500 line-through ml-2">
                                                                ${product.price}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg font-bold text-gray-800">
                                                            ${product.price}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <button
                                                    onClick={(e) => handleAddToCart(product?._id, e)}
                                                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-110"
                                                >
                                                    <FiShoppingCart />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-12"
                            >
                                <div className="text-5xl mb-4">😕</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                                <button 
                                    onClick={() => navigate('/')}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </motion.div>
                        )}

                        {/* Pagination */}
                        {products?.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-1">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={page === 1}
                                        className={`p-2 rounded-full ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <FiChevronLeft size={20} />
                                    </button>
                                    
                                    {typeof totalProducts === 'number' && totalProducts > 0 && limit > 0 ? (
                                        [...Array(Math.ceil(totalProducts / limit)).keys()].map(pageNumber => (
                                            <button
                                                onClick={() => handlePageChange(pageNumber + 1)}
                                                key={pageNumber}
                                                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                {pageNumber + 1}
                                            </button>
                                        ))
                                    ) : null}
                                    
                                    <button
                                        onClick={handleNextPage}
                                        disabled={page === totalPages}
                                        className={`p-2 rounded-full ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <FiChevronRight size={20} />
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BigCard />
        </div>
    );
};

export default ProductListingPage;