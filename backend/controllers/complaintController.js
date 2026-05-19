const Candidate = require("../models/Complaint");

exports.addCandidate = async (req, res) => {

    try {

        const candidate = await Candidate.create(req.body);

        res.status(201).json(candidate);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};

exports.getCandidates = async (req, res) => {

    try {

        const candidates = await Candidate.find();

        res.json(candidates);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};