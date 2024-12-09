const Ad = require("../models/Ad");

const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find(); // Fetch all ads
    res.status(200).json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createAd = async (req, res) => {
  try {
    console.log("Request body received:", req.body);
    const ad = new Ad(req.body);
    const savedAd = await ad.save(); // 🔥 Save ad to the database
    console.log("Ad saved to MongoDB:", savedAd);
    const io = req.app.get("io");
    io.emit("adCreated", savedAd); // 🔥 Emit WebSocket event
    res.status(201).json(savedAd);
  } catch (error) {
    console.error("Error saving ad:", error);
    res.status(500).json({ message: "Server Error", error: error.errors }); // Send the validation errors to the client
  }
};

module.exports = { getAllAds, createAd };
