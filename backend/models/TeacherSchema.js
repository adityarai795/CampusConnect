import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["teacher", "admin", "professor"],
      default: "teacher",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v); 
        },
        message: (props) => `${props.value} valid email nahi hai!`,
      },
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
      type: Number,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v); 
        },
        message: (props) => `${props.value} valid mobile number nahi hai!`,
      },
    },

    // Categorization for School vs College
    category: {
      type: String,
      enum: ["school", "college", "university"],
      required: true,
    },

    // Identification
    employeeId: { type: String, unique: true },
    designation: { type: String }, // e.g., "Senior Coordinator", "Assistant Professor"
    department: { type: String }, // e.g., "Mathematics", "Department of Physics"

    subjects: [
      {
        name: { type: String },
        level: { type: String }, // e.g., "Advanced", "10th Grade", "Post-Graduate"
      },
    ],

    profilePicture: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    bio: {
      type: String,
      default: "Teacher at [Institution Name]",
    },

    // Detailed Experience for Career Tracking
    // experience array ke andar status add karein
    experience: [
      {
        organizationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organization",
        }, // Link to Org
        organizationName: { type: String },
        role: { type: String },
        from: { type: Date },
        to: { type: Date },
        isCurrent: { type: Boolean, default: false },
        employmentStatus: {
          type: String,
          enum: ["active", "resigned", "terminated", "retired"],
          default: "active",
        },
      },
    ],

    // Formal Qualifications
    academicHistory: [
      {
        degree: { type: String },
        institution: { type: String },
        yearOfPassing: { type: Number },
      },
    ],

    // Connection to Students/Classes
    assignedClasses: [
      {
        classId: { type: String }, // e.g., "10-A" or "B.Tech-CS-3A"
        subject: { type: String },
      },
    ],

    socialLinks: {
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      googleScholar: { type: String, trim: true }, // Crucial for College Professors
      portfolio: { type: String, trim: true },
    },

    accountStatus: {
      type: String,
      enum: ["active", "on-leave", "retired"],
      default: "active",
    },
    activity: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
