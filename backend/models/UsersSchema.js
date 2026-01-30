const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  institutionType: {
    type: String,
    enum: ["school", "college", "university"],
    required: true,
    lowercase: true,
  },
  institutionName: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "graduated", "withdrawn", "suspended", "alumni"],
    default: "active",
  },
  grade: String,
  section: String,
  branch: String,
  semester: Number,
  rollNumber: String,
  startYear: Number,
  endYear: Number,
  performanceMetric: {
    type: String,
    enum: ["CGPA", "Percentage", "Grade"],
    default: "Percentage",
  },
  score: Number,
});

const userSchema = new mongoose.Schema(
  {
    abcId: {
      type: String,
      unique: true,
      index: true,
    },

    role: {
      type: String,
      default: "user",
    },

    name: String,

    email: {
      type: String,
      required: true,
    },

    mobileno: {
      type: String, // STRING, not Number
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: (props) => `${props.value} valid mobile number nahi hai!`,
      },
    },

    authProviders: {
      local: {
        enabled: { type: Boolean, default: false },
        password: { type: String, default: null },
      },
      google: {
        enabled: { type: Boolean, default: false },
        googleId: { type: String, default: null, index: true },
      }
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
      leetcode: String,
      github: String,
      linkedin: String,
    },

    activitylog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
