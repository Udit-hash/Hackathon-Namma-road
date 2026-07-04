
const express = require("express");
const { User } = require("../db");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    
    const leaderboard = await User.find({}, "username firstname lastname points totalreport badges")
      .sort({ points: -1 })
      .limit(10)
      .lean();
    res.status(200).json({ leaderboard });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
});

module.exports = router;
