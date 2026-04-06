const Product = require("../models/ProductSchema");
module.exports.showAllProducts = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const owner = req.user._id;
    const { title, category, price, description, location, imageUrl } =
      req.body;
    console.log(owner);

    const newProduct = new Product({
      title,
      category,
      price,
      description,
      location,
      imageUrl,
      owner,
    });
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ data: savedProduct, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "owner",
      "username email",
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ data: updatedProduct, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
