const express = require("express");
const router = express.Router();
const { getAllAds, createAd } = require("../controllers/adController");

router.get("/", getAllAds);
router.post("/", createAd);

module.exports = router;
