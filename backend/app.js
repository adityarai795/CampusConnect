const express= require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routers/authRouters');
const resultRouter = require("./routers/resultRouters");
const resourceRouter = require("./routers/resourceRouters");
const postRouter = require("./routers/communityRouters");
const profileRouter = require("./routers/profileRouter");
const jobRouter=require("./routers/jobRouters")
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.mongoose_url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

app.use("/auth", authRouter);
app.use("/result", resultRouter);
app.use("/resource", resourceRouter);
app.use("/community",postRouter)
app.use("/profile", profileRouter);
app.use("/job", jobRouter);


app.get("/",(req,res)=>{
  res.send("This is home ");
});


// app.get("*",(req,res)=>{
//   res.status(404).send("Page not found");
// });
// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});