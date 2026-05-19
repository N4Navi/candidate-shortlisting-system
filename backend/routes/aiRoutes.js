const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/analyze", async (req, res) => {

    try {

        const { complaint } = req.body;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "openai/gpt-oss-120b:free",

                messages: [
                    {
                        role: "user",

                        content: `
Analyze this complaint:

"${complaint}"

Return:
1. Urgency
2. Department
3. Short Summary
4. Auto-response
`
                    }
                ]
            },

            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"
                }
            }

        );

        res.json(response.data);

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            error: "AI analysis failed"
        });

    }

});

module.exports = router;