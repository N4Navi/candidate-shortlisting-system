const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const complaintRoutes =
    require("./routes/complaintRoutes");

const authRoutes =
    require("./routes/authRoutes");
const aiRoutes =
require("./routes/aiRoutes");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/ai", aiRoutes);
mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((error) => {

    console.log(error);

});

app.use(
    "/api/complaints",
    complaintRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.get("/", (req, res) => {

    res.send("API Running");

});

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});