import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
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
      description: "Government or Board registration ID",
    },

    // Branding & Assets
    logo: {
      type: String,
      default: "https://via.placeholder.com/150?text=Org+Logo",
    },
    bannerImage: { type: String },

    // Contact & Location
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      uppercase: true,
      lowercase: true,
      number: true,
      specialchar: true,
    },
    mobileno: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v); // Email format check
        },
        message: (props) => `${props.value} valid email nahi hai!`,
      },
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "India" },
    },
    website: { type: String },

    // Administrative Structure
    departments: [
      {
        name: { type: String }, // e.g., "Department of IT", "Primary Wing"
        head: { type: String }, // Name or Reference to a Teacher
      },
    ],

    affiliations: [String], // e.g., ["CBSE", "UGC", "AICTE"]

    // Future Scope: Resource Management
    subscriptionPlan: {
      type: String,
      enum: ["free", "basic", "premium", "enterprise"],
      default: "free",
    },

    // Analytics/Counts (Optional but helpful for fast queries)
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
      description: "Whether the institution has been verified by your platform",
    },
  },
  { timestamps: true }
);
organizationSchema.pre("findOneAndDelete", async function (next) {
  const orgId = this.getQuery()._id;

  try {
    // 1. Sabhi Teachers ka experience update karein ya unhe delete karein
    const Teacher = mongoose.model("Teacher");
    await Teacher.deleteMany({ "experience.organizationId": orgId });

    // 2. Sabhi Students ko delete karein jo is Org se jude hain
    const User = mongoose.model("User");
    await User.deleteMany({ "academicDetails.organizationId": orgId });

    // 3. Activity log clean karein
    const Activity = mongoose.model("Activity");
    await Activity.deleteMany({ organizationId: orgId });

    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Organization", organizationSchema);
