const express= require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routers/authRouters');
const resultRouter = require("./routers/resultRouters");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use("/result", resultRouter);

mongoose.connect(process.env.mongoose_url)
.then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.error("Error connecting to MongoDB:", err);
});

app.get("/",(req,res)=>{
  res.send("This is home ");
});


// app.get("*",(req,res)=>{
//   res.status(404).send("Page not found");
// });
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});