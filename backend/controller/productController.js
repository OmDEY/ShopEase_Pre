const { Product } = require("../models/product");
const Category = require("../models/categories");
const UserReview = require("../models/userReview"); // Adjust the path as necessary
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");
const options = require("../options");

const multer = require("multer");
const upload = multer();

const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto" }, // Automatically determine the resource type
        (error, result) => {
          if (error) {
            console.log(error);
            reject("Cloudinary upload failed");
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(file.buffer); // Use .end() to send the file buffer
  });
};

// Route handler to add product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      stock,
      additionalInfo,
      brand,
      colors,
      categoryDetails,
    } = req.body;
    console.log("Category Details >>>>> ", categoryDetails);

    // Ensure colors is an array
    const colorsArray = Array.isArray(colors)
      ? colors
      : JSON.parse(colors || "[]");

    console.log('mainImages >>> ', req.files)

    // Handle main images
    const mainImagesFiles = req.files.filter(
      (file) => file.fieldname === "mainImages"
    );

    mainImagesFiles.forEach((file) => {
      console.log('file', file);
    });

    const mainImagesPromises = mainImagesFiles.map((file) =>
      uploadImageToCloudinary(file)
    );
    const mainImages = await Promise.all(mainImagesPromises);

    console.log('mainImages', mainImages)

    // Handle additional info and its images
    const additionalImagesPromises = additionalInfo?.map(
      async (info, index) => {
        const additionalImageFiles = req.files?.filter(
          (file) => file.fieldname === `additionalInfo[${index}][images]`
        );
        const uploadedAdditionalImagesPromises = additionalImageFiles?.map(
          (file) => uploadImageToCloudinary(file)
        );
        const uploadedAdditionalImages = await Promise.all(
          uploadedAdditionalImagesPromises
        );
        return {
          description: info.description,
          images: uploadedAdditionalImages, // Ensure images are just URLs as strings
        };
      }
    );

    let additionalImages = [];
    if (additionalImagesPromises) {
      additionalImages = await Promise.all(additionalImagesPromises);
    }

    console.log("Additional Images >>>>> ", additionalImages);
    console.log("Colors Array >>>>> ", colorsArray);

    // Ensure category exists or create it
    let categoryFound = await Category.findOne({ categoryName: category });
    if (!categoryFound) {
      categoryFound = await Category.create({ categoryName: category });
    }

    // Create a new product instance
    const product = new Product({
      title,
      description,
      price,
      category: categoryFound._id, // Save the reference to the category ID
      stock,
      categoryDetails, // Passing category details for Product
      images: mainImages, // Store image URLs as an array of strings
      brand,
      colors: colorsArray, // ✅ Save colors array in DB
      additionalInfo: additionalImages || [], // Store as array of objects
    });

    // Save the product to the database
    await product.save();

    return res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    return res.status(200).json({ products, totalProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log(req.params, "<<< req.query");
    const product = await Product.findById(req.params.id)
      .populate({
        path: "reviews", // Populate the reviews field
        populate: {
          path: "userId", // Populate the userId field inside each review
        },
      })
      .exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock, additionalInfo } =
      req.body;

    // Check if additionalInfo is a string, and parse it if necessary
    let parsedAdditionalInfo = additionalInfo;
    if (typeof additionalInfo === "string") {
      parsedAdditionalInfo = JSON.parse(additionalInfo);
    }

    // Handle main images
    const mainImagesFiles = req.files.filter(
      (file) => file.fieldname === "mainImages"
    );
    const mainImagesPromises = mainImagesFiles.map((file) =>
      uploadImageToCloudinary(file)
    );
    const mainImages = await Promise.all(mainImagesPromises);

    // Handle additional info and its images
    const additionalImagesPromises = parsedAdditionalInfo.map(
      async (info, index) => {
        const additionalImageFiles = req.files.filter(
          (file) => file.fieldname === `additionalInfo[${index}][images]`
        );
        const uploadedAdditionalImagesPromises = additionalImageFiles.map(
          (file) => uploadImageToCloudinary(file)
        );
        const uploadedAdditionalImages = await Promise.all(
          uploadedAdditionalImagesPromises
        );
        return {
          description: info.description,
          images: uploadedAdditionalImages,
        };
      }
    );

    const additionalImages = await Promise.all(additionalImagesPromises);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        category,
        stock,
        images: mainImages,
        additionalInfo: additionalImages,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Product updated successfully!", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Product deleted successfully!", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchProductsOnFilter = async (req, res) => {
  /*try {
    const { filters } = req.query;
    const products = await Product.find({ filters });
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }*/

  try {
    let filters = {};

    // Extract query parameters
    const { category, Brand, colors, priceRange, searchTerm, ...otherFilters } = req.query;

    console.log('query >>> ', req.query)

    // Category filter
    if (category) {
      filters.category = category;
    }

    // Brand filter
    if (Brand) {
      filters.$or = [
        { brand: new RegExp(`^${Brand}$`, "i") },
        { 'categoryDetails.Brand': new RegExp(`^${Brand}$`, "i") }
      ];
    }    

    // Colors filter (Multiple values comma-separated)
    if (colors) {
      const colorsArray = colors.split(",");
      filters.colors = { $in: colorsArray };
    }

    // Price Range filter
    if (priceRange) {
      const [min, max] = priceRange.split(",").map(Number);
      filters.price = { $gte: min, $lte: max };
    }



    // Dynamic filters inside categoryDetails
    Object.keys(otherFilters).forEach((key) => {
      if(key == "Warranty"){
        otherFilters[key] = otherFilters[key].split(" ")[0]
      }
      filters[`categoryDetails.${key.toLowerCase()}`] = otherFilters[key];
    });

    if (searchTerm) {
      // Escape special regex characters in the search term
      const escapedSearchTerm = searchTerm.replace(
        /[.*+?^=!:${}()|\[\]\/\\]/g,
        "\\$&"
      );

      // Create the query for title and description using new RegExp
      filters.$or = [
        { title: { $regex: escapedSearchTerm, $options: "i" } },
        { description: { $regex: escapedSearchTerm, $options: "i" } },
      ];
    }

    console.log('filters', filters);

    // Fetch products based on filters
    const products = await Product.find(filters).populate('category', 'categoryName');

    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const fetchProductsFiltered = async (req, res) => {
  try {
    // Get filters from query parameters
    const {
      categories, // Array of selected categories (could be a comma-separated string or an array)
      minPrice,
      maxPrice,
      inStock,
      searchTerm,
      page = 1, // Default to page 1 if not specified
      limit = 20, // Default limit of 20 items per page
      ...dynamicFilters // Catch any additional dynamic filters sent in the request
    } = req.query;

    // Build the query object based on the filters
    let query = {};

    // Category filter (handle multiple categories)
    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : categories.split(",");
      query.category = { $in: categoryList };
    }

    // Price range filter
    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    // In stock filter (if inStock is true, check for available stock)
    if (inStock) {
      query.stock = { $gt: 0 };
    }

    // Search term filter (for title or description)
    if (searchTerm) {
      // Escape special regex characters in the search term
      const escapedSearchTerm = searchTerm.replace(
        /[.*+?^=!:${}()|\[\]\/\\]/g,
        "\\$&"
      );

      // Create the query for title and description using new RegExp
      query.$or = [
        { title: { $regex: escapedSearchTerm, $options: "i" } },
        { description: { $regex: escapedSearchTerm, $options: "i" } },
      ];
    }

    // Handle dynamic filters (like Brand, Warranty, Battery Life, etc.)
    for (const filterLabel in dynamicFilters) {
      const filterValue = dynamicFilters[filterLabel];

      // Handle different filter types: checkbox, radio, dropdown, etc.
      if (Array.isArray(filterValue)) {
        // If it's an array (checkboxes or multiple selection dropdown), use $in for matching multiple values
        query[filterLabel] = { $in: filterValue };
      } else if (filterValue) {
        // For single selection filters (radio, single value dropdown)
        query[filterLabel] = filterValue;
      }
    }

    console.log("query", query);

    // Pagination: calculate the skip and limit for the page
    const skip = (parseInt(page) - 1) * parseInt(limit); // Skip value
    const limitNumber = parseInt(limit); // Limit value

    // Fetch products based on the constructed query
    const products = await Product.find(query)
      .populate("category", "categoryName") // Optional: if you want to populate category field
      .skip(skip) // Skip products based on the page
      .limit(limitNumber) // Limit the number of products per page
      .exec();

    // Get the total number of products matching the query (without pagination)
    const totalProducts = await Product.countDocuments(query);

    // Handle case where no products are found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the found products as the response along with pagination info
    res.status(200).json({
      products,
      totalProducts,
      page: parseInt(page),
      limit: limitNumber,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

const submitProductReview = async (req, res) => {
  const { userId, productId, rating, review } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ error: "Invalid user or product ID" });
  }

  try {
    const newReview = new UserReview({
      userId,
      productId,
      rating,
      review,
    });

    await newReview.save();
    const product = await Product.findById(productId);
    product.reviews.push(newReview._id);
    await product.save();

    // Populate the user data in the new review before returning the response
    const populatedReview = await UserReview.findById(newReview._id)
      .populate({
        path: "userId", // Populate the userId field (which references the User model)
      })
      .exec();

    // Return the review with populated user data
    res.status(201).json(populatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchOptions = async (req, res) => {
  res.json(options);
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  fetchProductsFiltered,
  submitProductReview,
  fetchOptions,
  fetchProductsOnFilter,
};
