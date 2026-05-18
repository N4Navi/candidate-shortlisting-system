const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    skills: [{
        type: String
    }],

    experience: {
        type: Number,
        required: true
    },

    bio: {
        type: String
    },

    shortlisted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Candidate", CandidateSchema);