const authMiddleware =
require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

router.post("/", async (req, res) => {
    try {

        const complaint = new Complaint(req.body);

        await complaint.save();

        res.status(201).json(complaint);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

router.get("/", async (req, res) => {

    try {

        const complaints = await Complaint.find();

        res.json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.put("/:id",
authMiddleware,

async (req, res) => {

    try {

        const updatedComplaint =
            await Complaint.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(updatedComplaint);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/search", async (req, res) => {

    try {

        const {
            location,
            category,
            status
        } = req.query;

        let query = {};

        if (location) {
            query.location = location;
        }

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        const complaints =
            await Complaint.find(query);

        res.json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;