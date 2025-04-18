const express = require('express');
const bannerImageRoutes = require('./routes/bannerImagesRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homePageCategoryDataUploads = require('./routes/homePageCategoryDataUploads');
const connect = require('./config/db');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const newA = require('./routes/newArrivalsRoute');
const bestSellersRoute = require('./routes/bestSellersRoute');
const discountDealsRoute = require('./routes/discountDealsRoute');
const dealOfTheDayRoutes = require('./routes/dealOfTheDayRoutes');
const featuredProductsRoutes = require('./routes/featuredProductsRoutes');
const weekendSpecialProductsRoutes = require('./routes/weekendSpecialProductsRoutes');
const clearanceSaleRoute = require('./routes/clearanceSaleRoute');
const bundleOffersRoute = require('./routes/bundleOffersRoute');
const orderRoutes = require('./routes/orderRoutes');
const popularProductRoutes = require('./routes/popularProductRoutes');
const dailyBestSalesRoute = require('./routes/dailyBestSalesRoute');
const fetchFeaturedCategoriesProducts = require('./routes/fetchFeaturedCategoriesProducts');

const port = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
connect().then(() => {

    app.use('/api/bannerImages', bannerImageRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/homePageCategoryDataUploads', homePageCategoryDataUploads)
    app.use('/api/admin', adminRoutes);
    app.use('/api/wishlist', wishlistRoutes);
    app.use("/api/payment", paymentRoutes);
    app.use('/api/new-arrivals', newA);
    app.use('/api/best-sellers', bestSellersRoute);
    app.use('/api/discount-deals', discountDealsRoute);
    app.use('/api/deals-of-the-day', dealOfTheDayRoutes);
    app.use('/api/featured-products', featuredProductsRoutes);
    app.use('/api/weekend-specials', weekendSpecialProductsRoutes);
    app.use('/api/clearance-sale', clearanceSaleRoute);
    app.use('/api/bundle-offers', bundleOffersRoute);
    app.use('/api/orders', orderRoutes);
    app.use('/api/popular-product', popularProductRoutes)
    app.use('/api/daily-best-sales', dailyBestSalesRoute);
    app.use('/api/featured-categories', fetchFeaturedCategoriesProducts);

    app.get('/', async (req, res) => {
        res.send('Hello World');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.log('An Error Occured while connecting to the database', err)
});
