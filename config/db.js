const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        console.log("MongoDB works");
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;