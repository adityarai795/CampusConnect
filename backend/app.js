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

app.use(cookieParser());
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.mongoose_url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
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