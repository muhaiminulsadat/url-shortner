import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    url_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
      index: true,
    },
    city: {
      type: String,
      default: "Unknown",
    },
    device: {
      type: String,
      default: "Unknown",
    },
    country: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: true,
  },
);

clickSchema.index({url_id: 1, createdAt: -1});

export default mongoose.models.Click || mongoose.model("Click", clickSchema);
