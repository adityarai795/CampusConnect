const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  showAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/marketPlaceProductController");

// GET /marketplace/products - Retrieve all products
router.get("/ShowAllProducts", showAllProducts);
router.post("/AddProduct", authMiddleware, addProduct);
router.get("/GetProduct/:id", getProductById);
router.put("/update/:id", authMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports = router;
