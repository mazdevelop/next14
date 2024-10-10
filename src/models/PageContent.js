import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  content: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);