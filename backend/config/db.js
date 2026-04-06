const mongoose = require('mongoose');
const dbConnect = async () => {
  console.log("Connecting to MongoDB...");
  mongoose
    .connect(process.env.mongoose_url, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
  
};
module.exports = dbConnect;