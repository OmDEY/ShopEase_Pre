const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const imageUpload = require('../middleware/imageUpload');

router.post('/addProduct', imageUpload, productController.addProduct);
router.get('/getProducts', productController.getProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/updateProduct/:id', imageUpload, productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/fetchProductsFiltered', productController.fetchProductsFiltered);
router.post('/submitProductReview', productController.submitProductReview);
router.get('/fetchOptions', productController.fetchOptions);
router.get('/fetchProductsOnFilter', productController.fetchProductsOnFilter);
router.post('/userReturnProduct/:orderId/:itemId', imageUpload, productController.userReturnProduct);
router.get('/fetchTwoProductsPerCategory', productController.fetchTwoProductsPerCategory);


module.exports = router;