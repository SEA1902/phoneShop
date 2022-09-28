const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');


router.post("/create-product", productController.create);

router.get("/get-product-list", productController.getAll);

router.get("/get-product/:productId", productController.getById);

router.delete("/delete-product/:productId", productController.delete);

router.post("/search", productController.search)

module.exports = router;
