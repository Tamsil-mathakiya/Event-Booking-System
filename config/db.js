const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI = process.env.URL;

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error("MongoDB connection error", err);
    });
}

module.exports = connectDB;