const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  institutionType: {
    type: String,
    enum: ["School", "College", "University","school","college","university"],
    required: true,
  },
  institutionName: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "graduated", "withdrawn", "suspended", "alumni"],
    default: "active",
  },
  // School specific fields
  grade: {
    type: String
  }, // e.g., "10th", "12th"
  section: { type: String }, // e.g., "A", "B"

  // College specific fields
  branch: { type: String }, // e.g., "Science", "Commerce", "CSE"
  semester: { type: Number },

  // Common fields
  rollNumber: { type: String },
  startYear: { type: Number },
  endYear: { type: Number }, // Expected or Actual
  performanceMetric: {
    type: String,
    enum: ["CGPA", "Percentage", "Grade"],
    default: "Percentage",
  },
  score: { type: Number },
});

const userSchema = new mongoose.Schema(
  {
    abcId: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    mobileno: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: (props) => `${props.value} valid mobile number nahi hai!`,
      },
    },
    authProviders: {
      local: { type: Boolean, default: false },
      google: { type: Boolean, default: false },
    },

    googleId: String,
      refreshToken: String,

    password: {
      type: String,
      required: true,
      uppercase: true,
      lowercase: true,
      number: true,
      specialchar: true,
    },
    academicDetails: {
      type: [academicSchema],
      default: [],
    },
    studentCategory: {
      type: String,
      enum: ["school", "college"],
      default: "college",
      required: true,
    },
    socialLinks: {
      leetcode: { type: String },
      github: { type: String },
      linkedin: { type: String },
    },
    activitylog: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
