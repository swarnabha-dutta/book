const express = require("express");
const router = express.Router();
const Ticket = require("../models/schema.js");
const cors = require("cors");
const app = express();



router.use(express.json());
router.use(cors());



// Endpoint for creating a new booking and adding it to the database.
router.post("/booking", async (req, res) => {
    const { movie, slot, seats } = req.body;
    try {
        const myData = new Ticket({
            movie,
            slot,
            seats
        });
        const savedMyData = await myData.save();
        res.status(200).json({
            data: savedMyData,
            message: "Ticket Booked Successfully",
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Something went wrong! Please try again.",
        });
    }
});


// Endpoint for getting the last booking details from the database and sending it to the frontend.


router.get("/booking", async (req, res) => {
    try {
        const myData = await Ticket.find().sort({ _id: -1 }).limit(1);
        if (myData.length === 0) {
            // No booking found, respond with appropriate message
            res.status(200).json({ data: null, message: "No previous booking found!" });
        } else {
            // Respond with the last booking details
            res.status(200).json({ data: myData[0] });
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Something went wrong! Please try again.",
        })
    }
});


module.exports = router;