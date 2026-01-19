const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {
  showAllProducts,
  addProduct,
  getProductById,
} = require("../controllers/marketPlaceProductController");


// GET /marketplace/products - Retrieve all products
router.get("/ShowAllProducts",showAllProducts);
router.post("/AddProduct",authMiddleware, addProduct);
router.get("/GetProduct/:id", getProductById);



module.exports = router;