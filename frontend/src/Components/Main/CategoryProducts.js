import React, { useEffect, useState } from 'react';
import { fetchTwoProductsPerCategory } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CategoryProducts = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate();

  const fetchProductsPerCategory = async () => {
    try {
      const response = await fetchTwoProductsPerCategory();
      console.log('API Response >>>', response);

      // Transform response into desired format: [{ category, products: [...] }, ...]
      const formatted = Object.entries(response).map(([categoryName, products]) => ({
        category: categoryName,
        products: products.map(product => ({
          id: product._id,
          name: product.title,
          image: product.images?.[0] || 'https://via.placeholder.com/150',
          rating: product.averageRating || product.rating || 0,
          price: `$${product.price}`,
        })),
      }));

      setCategoriesData(formatted);
    } catch (error) {
      console.error('Error fetching products per category:', error);
    }
  };

  useEffect(() => {
    fetchProductsPerCategory();
  }, []);

  return (
    <div className="my-12 px-4 lg:px-8 mt-48">
      <div className="flex overflow-x-auto space-x-6">
        {categoriesData.map((category) => (
          <div key={category.category} className="flex-shrink-0 w-80">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="space-y-6">
              {category.products.map((product) => (
                <div
                  onClick={() => navigate(`/product?productId=${product.id}`)}
                  key={product.id}
                  className="flex cursor-pointer items-center bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500">
                        {'★'.repeat(Math.round(product.rating))}
                        {'☆'.repeat(5 - Math.round(product.rating))}
                      </span>
                      <span className="ml-2 text-gray-500">({product.rating})</span>
                    </div>
                    <p className="text-lg font-semibold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
