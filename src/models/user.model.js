import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
  },
  {
    collection: "user",
    timestamps: true,
    strict: false,
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
