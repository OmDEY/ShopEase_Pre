const { Product } = require("../models/product");
const Category = require("../models/categories");
const UserReview = require("../models/userReview"); // Adjust the path as necessary
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

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

    // Handle main images
    const mainImagesFiles = req.files.filter(
      (file) => file.fieldname === "mainImages"
    );
    const mainImagesPromises = mainImagesFiles.map((file) =>
      uploadImageToCloudinary(file)
    );
    const mainImages = await Promise.all(mainImagesPromises);

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
      mainImages, // Store image URLs as an array of strings
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

const fetchProductsFiltered = async (req, res) => {
  try {
    // Get filters from query parameters
    const { category, minPrice, maxPrice, inStock, searchTerm } = req.query;

    // Build the query object based on the filters
    let query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    // In stock filter
    if (inStock) {
      query.stock = { $gt: 0 };
    }

    // Search term filter (for title or description)
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Fetch products based on the constructed query
    const products = await Product.find(query);

    // Handle case where no products are found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the found products as the response
    res.status(200).json({ products, totalProducts: products.length });
  } catch (error) {
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

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  fetchProductsFiltered,
  submitProductReview,
};
