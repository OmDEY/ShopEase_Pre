const express = require('express');
const bannerImageRoutes = require('./routes/bannerImagesRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homePageCategoryDataUploads = require('./routes/homePageCategoryDataUploads');
const connect = require('./config/db');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// MongoDB connection
connect().then(() => {

    app.use('/api/bannerImages', bannerImageRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/homePageCategoryDataUploads', homePageCategoryDataUploads)
    app.use('/api/admin', adminRoutes);

    app.get('/', async (req, res) => {
        res.send('Hello World');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.log('An Error Occured while connecting to the database', err)
});
