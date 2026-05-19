const express = require("express");

const router = express.Router();

router.post("/analyze", async (req, res) => {

    try {

        const {
            category,
            description
        } = req.body;

        let priority = "Low";
        let department = "General Department";

        if (
            category.toLowerCase().includes("water")
        ) {
            priority = "Medium";
            department = "Water Department";
        }

        if (
            category.toLowerCase().includes("electricity")
        ) {
            priority = "High";
            department = "Electricity Department";
        }

        if (
            category.toLowerCase().includes("garbage")
        ) {
            priority = "Medium";
            department = "Sanitation Department";
        }

        const summary =
            description.slice(0, 80);

        const response =
            "Your complaint has been registered successfully and forwarded to the concerned department.";

        res.json({
            priority,
            department,
            summary,
            response
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;