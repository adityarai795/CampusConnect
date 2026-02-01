const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const helmet = require("helmet");
const { google } = require("googleapis");
const authRouter = require("./routers/authRouters");
const resultRouter = require("./routers/resultRouters");
const resourceRouter = require("./routers/resourceRouters");
const postRouter = require("./routers/communityRouters");
const profileRouter = require("./routers/profileRouter");
const jobRouter = require("./routers/jobRouters");
const problemRouter = require("./routers/problemRouters.js");
const cookieParser = require("cookie-parser");
const organizationRouter = require("./routers/orginazationRouter");
const teacherRouter = require("./routers/teacherRouter");
const dbConnect = require("./config/db");
const homeRouter = require("./routers/homeRouters");
const marketPlaceProductRouters = require("./routers/marketPlaceProductRouters");
const practiceRouter = require("./routers/practiceRouter.js");
const roadmapRouter = require("./routers/roadMapRouter.js");
const otpRouter = require("./routers/otpRouters");
const { oauth2Client } = require("./utils/googleAuth");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

dbConnect();

app.use("/auth", authRouter);
app.use("/result", resultRouter);
app.use("/resource", resourceRouter);
app.use("/community", postRouter);
app.use("/profile", profileRouter);
app.use("/job", jobRouter);
app.use("/home", homeRouter);
app.use("/problem", problemRouter);
app.use("/teacher", teacherRouter);
app.use("/organization", organizationRouter);
app.use("/marketPlace", marketPlaceProductRouters);
app.use("/practice", practiceRouter);
app.use("/api/otp", otpRouter);

app.get("/", (req, res) => {
  res.send("This is home ");
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
