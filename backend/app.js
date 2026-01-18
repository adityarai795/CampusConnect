const express= require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const authRouter = require('./routers/authRouters');
const resultRouter = require("./routers/resultRouters");
const resourceRouter = require("./routers/resourceRouters");
const postRouter = require("./routers/communityRouters");
const profileRouter = require("./routers/profileRouter");
const jobRouter = require("./routers/jobRouters");
const codingProblemRouter = require("./routers/codingProblem.js");
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const organizationRouter = require('./routers/orginazationRouter');
const teacherRouter = require('./routers/teacherRouter');
const dbConnect = require('./config/db');
const homeRouter = require("./routers/homeRouters");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
dbConnect();

app.use("/auth", authRouter);
app.use("/result", resultRouter);
app.use("/resource", resourceRouter);
app.use("/community",postRouter)
app.use("/profile", profileRouter);
app.use("/job", jobRouter);
app.use("/home", homeRouter);
app.use("/problem", codingProblemRouter);
app.use("/teacher", teacherRouter);
app.use("/organization",organizationRouter);

app.get("/",(req,res)=>{
  res.send("This is home ");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});