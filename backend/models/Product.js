import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema(
  {
    perBox: { type: Number, required: true },
    perSqFt: { type: Number },
    sample: { type: Number },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    badge: { type: String },
    tileCollection: [String], // ✅ renamed from "collection"
    material: { type: String },
    application: [String],
    imageGallery: [String],
    finishOptions: [String],
    colorOptions: [String],
    sizeShape: [String],
    availableInThisCollection: [String],
    coverageSqFtPerBox: { type: Number },
    brandInfo: { type: String },
    description: { type: String },
    pricing: pricingSchema,
    countInStock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
