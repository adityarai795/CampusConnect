const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["organization"],
      default: "organization",
    },

    orgType: {
      type: String,
      enum: ["School", "College", "University", "Coaching_Center"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows multiple null values
      trim: true,
    },

    // Branding
    logo: {
      type: String,
      default: "https://via.placeholder.com/150?text=Org+Logo",
    },
    bannerImage: {
      type: String,
    },

    // Contact
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // ✅ never return password
    },

    mobileno: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },

    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "India" },
    },

    website: {
      type: String,
      trim: true,
    },

    // Admin structure
    departments: [
      {
        name: { type: String, trim: true },
        head: { type: String, trim: true },
      },
    ],

    affiliations: [{ type: String, trim: true }],

    subscriptionPlan: {
      type: String,
      enum: ["free", "basic", "premium", "enterprise"],
      default: "free",
    },

    stats: {
      totalStudents: { type: Number, default: 0 },
      totalTeachers: { type: Number, default: 0 },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Organization", organizationSchema);
