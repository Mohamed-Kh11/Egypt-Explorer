import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    price: { type: Number, required: true },
    size: { type: String }, // optional (for clothes)
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: String, required: true }, // Cloudinary URL
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
