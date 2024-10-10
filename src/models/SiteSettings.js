import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  siteName: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  logo: { type: String },
  contactEmail: { type: String, required: true },
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);