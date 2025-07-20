import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
    price: { type: Number, required: true },
    description: { type: String },
    type: { type: String, enum: ['normal', 'sample'], default: 'normal' },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
