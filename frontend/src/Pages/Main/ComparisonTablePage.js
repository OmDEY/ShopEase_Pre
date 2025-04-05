import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiStar, FiShoppingCart } from 'react-icons/fi';

const ComparisonTable = () => {
  // Sample product data - replace with your actual data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      rating: 4.5,
      image: 'https://via.placeholder.com/150?text=Headphones',
      brand: 'SoundMaster',
      color: 'Black',
      batteryLife: '30 hours',
      noiseCancellation: true,
      warranty: '2 years',
      weight: '250g',
      connectivity: 'Bluetooth 5.0'
    },
    {
      id: 2,
      name: 'Premium Wireless Earbuds',
      price: 179.99,
      rating: 4.7,
      image: 'https://via.placeholder.com/150?text=Earbuds',
      brand: 'AudioPro',
      color: 'White',
      batteryLife: '24 hours',
      noiseCancellation: true,
      warranty: '1 year',
      weight: '50g',
      connectivity: 'Bluetooth 5.2'
    },
    {
      id: 3,
      name: 'Noise Cancelling Headphones',
      price: 299.99,
      rating: 4.8,
      image: 'https://via.placeholder.com/150?text=Noise+Cancel',
      brand: 'QuietComfort',
      color: 'Silver',
      batteryLife: '20 hours',
      noiseCancellation: true,
      warranty: '3 years',
      weight: '280g',
      connectivity: 'Bluetooth 5.1'
    },
    {
      id: 4,
      name: 'Sports Wireless Earbuds',
      price: 89.99,
      rating: 4.2,
      image: 'https://via.placeholder.com/150?text=Sports',
      brand: 'FitSound',
      color: 'Blue',
      batteryLife: '15 hours',
      noiseCancellation: false,
      warranty: '1 year',
      weight: '40g',
      connectivity: 'Bluetooth 5.0'
    }
  ]);

  // Initialize with first two product IDs (not indexes)
  const [selectedProducts, setSelectedProducts] = useState([1, 2]); 
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products.filter(p => !selectedProducts.includes(p.id)));
    } else {
      setFilteredProducts(
        products.filter(
          p =>
            !selectedProducts.includes(p.id) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products, selectedProducts]);

  // Feature list for comparison
  const features = [
    { key: 'price', label: 'Price' },
    { key: 'brand', label: 'Brand' },
    { key: 'color', label: 'Color' },
    { key: 'batteryLife', label: 'Battery Life' },
    { key: 'noiseCancellation', label: 'Noise Cancellation' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'weight', label: 'Weight' },
    { key: 'connectivity', label: 'Connectivity' }
  ];

  const addProductToComparison = (productId) => {
    if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, productId]);
      setShowAddProductModal(false);
      setSearchTerm('');
    }
  };

  const removeProductFromComparison = (productId) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id) || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Product Comparison
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Compare features and choose the best product for your needs
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Features
                  </th>
                  {selectedProducts.map(productId => {
                    const product = getProductById(productId);
                    if (!product) return null;
                    
                    return (
                      <th
                        key={productId}
                        scope="col"
                        className="px-6 py-4 text-center relative"
                      >
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => removeProductFromComparison(productId)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                          <div className="h-40 w-40 flex items-center justify-center mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-500">
                              ({product.rating})
                            </span>
                          </div>
                          <p className="text-xl font-bold text-indigo-600 mb-3">
                            ${product.price.toFixed(2)}
                          </p>
                          <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            <FiShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
                      </th>
                    );
                  })}
                  {selectedProducts.length < 4 && (
                    <th
                      scope="col"
                      className="px-6 py-4 text-center"
                    >
                      <button
                        onClick={() => setShowAddProductModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        + Add Product
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((feature, featureIdx) => (
                  <tr
                    key={feature.key}
                    className={featureIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.label}
                    </td>
                    {selectedProducts.map(productId => {
                      const product = getProductById(productId);
                      if (!product) return null;
                      const value = product[feature.key];
                      return (
                        <td
                          key={`${productId}-${feature.key}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                        >
                          {typeof value === 'boolean'
                            ? value
                              ? 'Yes'
                              : 'No'
                            : value}
                        </td>
                      );
                    })}
                    {selectedProducts.length < 4 && <td></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProducts.map(productId => {
              const product = getProductById(productId);
              if (!product) return null;
              
              return (
                <div
                  key={productId}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">✓</span>
                      <span>
                        <span className="font-medium">Battery:</span> {product.batteryLife}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">✓</span>
                      <span>
                        <span className="font-medium">Connectivity:</span> {product.connectivity}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">✓</span>
                      <span>
                        <span className="font-medium">Warranty:</span> {product.warranty}
                      </span>
                    </li>
                    {product.noiseCancellation && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span>Active Noise Cancellation</span>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation Section */}
        {selectedProducts.length > 1 && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Recommendation</h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-700">
                    Based on your comparison, we recommend the{' '}
                    <span className="font-bold">
                      {getProductById(selectedProducts[0])?.name || 'selected product'}
                    </span>{' '}
                    for its excellent balance of features and value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 mb-4"
                      id="modal-title"
                    >
                      Add Product to Comparison
                    </h3>
                    <div className="mt-2">
                      <div className="relative mb-4">
                        <input
                          type="text"
                          className="block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map(product => (
                            <div
                              key={product.id}
                              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                              onClick={() => addProductToComparison(product.id)}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 h-20 w-20">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                                <div className="ml-4">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {product.brand}
                                  </p>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="ml-1 text-xs text-gray-500">
                                      ({product.rating})
                                    </span>
                                  </div>
                                  <p className="text-sm font-bold text-indigo-600 mt-1">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 py-8 text-center">
                            <p className="text-gray-500">
                              No products found. Try a different search term.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowAddProductModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;