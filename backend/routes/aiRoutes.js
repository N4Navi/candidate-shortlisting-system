const express = require("express");

const router = express.Router();

const axios = require("axios");

const Candidate = require("../models/Candidate");

router.post("/shortlist", async (req, res) => {

    try {

        const {
            requiredSkills,
            preferredSkills,
            minExperience
        } = req.body;

        const candidates = await Candidate.find();

        const prompt = `
You are an expert technical recruiter.

Job Requirements:
- Required Skills: ${requiredSkills.join(", ")}
- Preferred Skills: ${preferredSkills.join(", ")}
- Minimum Experience: ${minExperience} years

Candidates:
${JSON.stringify(candidates, null, 2)}

Tasks:
1. Rank candidates
2. Give match percentage
3. Explain why each candidate is suitable
4. Mention missing skills
5. Recommend interview focus areas
`;

        const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
        model: "openai/gpt-oss-120b:free",
        messages: [
            {
                role: "user",
                content: prompt
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

        res.json({
    result:
    response.data.choices[0].message.content
});

    } catch (err) {

        console.log(err.response?.data || err.message);

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;