const express = require("express");

const router = express.Router();

const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {

    try {

        const {
            requiredSkills,
            preferredSkills,
            minExperience
        } = req.body;

        const candidates = await Candidate.find();

        const rankedCandidates = candidates.map(candidate => {

            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills.includes(skill)
            );

            const preferredMatched = candidate.skills.filter(skill =>
                preferredSkills?.includes(skill)
            );

            const skillScore =
                (matchedSkills.length / requiredSkills.length) * 70;

            const preferredScore =
                ((preferredMatched.length || 0) /
                (preferredSkills?.length || 1)) * 20;

            const experienceScore =
                candidate.experience >= minExperience ? 10 : 0;

            const totalScore =
                skillScore +
                preferredScore +
                experienceScore;

            let ranking = "Low Match";

            if (totalScore >= 80) {
                ranking = "High Match";
            }
            else if (totalScore >= 50) {
                ranking = "Medium Match";
            }

            return {
                name: candidate.name,
                email: candidate.email,
                skills: candidate.skills,
                experience: candidate.experience,
                matchedSkills,
                totalScore,
                ranking
            };

        });

        rankedCandidates.sort(
            (a, b) => b.totalScore - a.totalScore
        );

        res.json(rankedCandidates);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;