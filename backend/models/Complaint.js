const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
},

    email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter valid email"]
},

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);