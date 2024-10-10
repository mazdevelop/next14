import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  price: { type: Number, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);