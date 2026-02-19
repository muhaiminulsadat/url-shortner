import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    // Original long URL (required)
    original_url: {
      type: String,
      required: [true, "Original URL is required"],
      trim: true,
    },

    // Auto-generated short code (e.g., 'abc123')
    short_url: {
      type: String,
      required: [true, "Short URL is required"],
      unique: true,
      trim: true,
    },

    // Custom URL provided by user (optional)
    custom_url: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      trim: true,
    },

    // Title of the page (fetched automatically or provided by user)
    title: {
      type: String,
      default: "Untitled Link",
      trim: true,
    },

    // QR code data (can be base64 string or path to generated QR)
    qr: {
      type: String,
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Url || mongoose.model("Url", urlSchema);
