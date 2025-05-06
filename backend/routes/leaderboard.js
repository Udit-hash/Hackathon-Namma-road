const express = require('express');
const { User } = require('../db');  
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const leaderboard = await User.find({ totalreport: { $gt: 0 } })  
            .sort({ points: -1 }) 
            .limit(10);  

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard" });
    }
});

module.exports = router;
