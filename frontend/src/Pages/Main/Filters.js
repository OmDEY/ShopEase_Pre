import React, { useState, useContext } from "react";
import { Range } from "react-range";
import axios from "axios";
import { fetchProductsOnFilter } from "../../services/api";
import { SearchContext } from "../../Context/ContextProvider";

const Filters = ({ filtersData, categories, handleFilterApply }) => {

  const { searchTerm } = useContext(SearchContext);

  const [values, setValues] = useState([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;

  // Handle filter changes
  const handleFilterChange = (filterCategory, option, type, label, priceRangeValues) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (type === "checkbox") {
        // Ensure the label always holds an array for checkboxes
        updatedFilters[label] = updatedFilters[label] || [];
        if (updatedFilters[label].includes(option)) {
          updatedFilters[label] = updatedFilters[label].filter((item) => item !== option);
        } else {
          updatedFilters[label] = [...updatedFilters[label], option];
        }
      } else if (type === "radio" || type === "dropdown") {
        updatedFilters[label] = option;
      } else if (label === "priceRange" && priceRangeValues) {
        updatedFilters[label] = priceRangeValues; // Store as an array [min, max]
      }

      return { ...updatedFilters };
    });
  };

  // Apply filters by making an API call
  const applyFilters = async () => {
    try {
      const formattedFilters = { ...selectedFilters };

      // Convert arrays to comma-separated strings for backend processing
      Object.keys(formattedFilters).forEach((key) => {
        if (Array.isArray(formattedFilters[key])) {
          formattedFilters[key] = formattedFilters[key].join(",");
        }
      });

      formattedFilters.searchTerm = searchTerm;

      console.log("Formatted Filters for API:", formattedFilters);

      await handleFilterApply(formattedFilters);

      // const response = await fetchProductsOnFilter(formattedFilters);
      // console.log("Filters applied successfully", response.data);

      // Make API call
      // const response = await axios.get("/api/products", { params: formattedFilters });
      // console.log("Filters applied successfully", response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({});
    setValues([MIN, MAX]);
  };

  return (
    <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Filters</h2>

      {/* Iterate over categories */}
      {categories.map((category) => {
        const filtersForCategory = filtersData[category?.categoryName];
        if (!filtersForCategory) return null;

        return (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{category.categoryName}</h3>

            {/* Render filter groups */}
            {filtersForCategory.map((filter, idx) => {
              const { label, options, type } = filter;

              // Price Range
              if (label === "Price Range") {
                return (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold mb-4 text-gray-700">Price Range</h4>
                    <Range
                      step={STEP}
                      min={MIN}
                      max={MAX}
                      values={values}
                      onChange={(values) => {
                        setValues(values);
                        handleFilterChange("Price Range", null, "priceRange", "priceRange", values);
                      }}
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
                        <div {...props} className="h-4 w-4 bg-blue-500 rounded-full" />
                      )}
                    />
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>${values[0]}</span>
                      <span>${values[1]}</span>
                    </div>
                  </div>
                );
              }

              // Radio buttons
              if (type === "radio") {
                return (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold mb-2 text-gray-600">{label}</h4>
                    <div className="space-y-2">
                      {options.map((option, optionIdx) => (
                        <div key={optionIdx} className="flex items-center">
                          <input
                            type="radio"
                            id={option}
                            name={label}
                            className="form-radio h-5 w-5 text-indigo-600"
                            onChange={() =>
                              handleFilterChange(category.categoryName, option, type, label)
                            }
                            checked={selectedFilters[label] === option}
                          />
                          <label htmlFor={option} className="ml-2 text-gray-600">{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              // Checkboxes (multi-select)
              if (type === "checkbox") {
                return (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold mb-2 text-gray-600">{label}</h4>
                    <ul className="space-y-2">
                      {options.map((option, optionIdx) => (
                        <li key={optionIdx}>
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              onChange={() => handleFilterChange(category.categoryName, option, type, label)}
                              checked={selectedFilters[label]?.includes(option)}
                            />
                            <span className="text-gray-600">{option}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              // Dropdown
              if (type === "dropdown") {
                return (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold mb-2 text-gray-600">{label}</h4>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={selectedFilters[label] || ""}
                      onChange={(e) => handleFilterChange(category.categoryName, e.target.value, type, label)}
                    >
                      <option value="">Select {label}</option>
                      {options.map((option, optionIdx) => (
                        <option key={optionIdx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              return null;
            })}
          </div>
        );
      })}

      {/* Apply and Clear Buttons */}
      <div className="flex space-x-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Filters;
