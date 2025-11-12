// routes/products.js
import express from "express";
import Product from "../../models/Product.js";

const router = express.Router();

// ✅ GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});

// ✅ CREATE a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, sizes, description, image } = req.body;

    // Basic validation for multilingual fields
    if (
      !name?.en || !name?.ar ||
      !description?.en || !description?.ar ||
      !price || !image
    ) {
      return res.status(400).json({
        message:
          "Missing required fields (name.en, name.ar, description.en, description.ar, price, image)",
      });
    }

    const newProduct = new Product({
      name,
      price,
      sizes, // array of strings
      description,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Error creating product",
      error: err.message,
    });
  }
});


// ✅ GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
});

// ✅ UPDATE a product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
});

// ✅ DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
});

export default router;
