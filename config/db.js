const mongoose = require("mongoose");



async function connectDB() {
    mongoose.connect("mongodb://localhost:27017/restaurant", { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function () {
        console.log("Database Connected")
    });
}


module.exports = {
    connectDB,
};