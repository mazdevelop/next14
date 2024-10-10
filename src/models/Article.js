import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  content: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);