const Product = require("../models/product_model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all_products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/products_details", { product: product });
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
  getProducts: getProducts,
  getProductById: getProductById,
};
