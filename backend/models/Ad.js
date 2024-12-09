const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
); // 🔥 Automatically creates createdAt and updatedAt

module.exports = mongoose.model("Ad", adSchema, "ads"); // 🔥 Explicitly set the collection name to "ads"
