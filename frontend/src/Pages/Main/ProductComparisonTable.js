import React from 'react';

const ProductComparisonTable = () => {
  // This is a placeholder - replace with your actual comparison data and logic
  const comparisonData = [
    {
      name: "Awesome Product",
      brand: "Brand A",
      price: 299,
      rating: 4.5,
      features: "Feature A, Feature B, Feature C",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Competitor Product",
      brand: "Brand B",
      price: 249,
      rating: 4.2,
      features: "Feature X, Feature Y",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left"></th>
              {comparisonData.map((item, index) => (
                <th key={index} className="p-4 text-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mx-auto rounded-lg" />
                  <p className="mt-2 font-medium">{item.name}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Brand</td>
              {comparisonData.map((item, index) => (
                <td key={index} className="p-4 text-center">{item.brand}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Price</td>
              {comparisonData.map((item, index) => (
                <td key={index} className="p-4 text-center">${item.price}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Rating</td>
              {comparisonData.map((item, index) => (
                <td key={index} className="p-4 text-center">{item.rating} ★</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium">Features</td>
              {comparisonData.map((item, index) => (
                <td key={index} className="p-4 text-center">{item.features}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComparisonTable;