const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const ambassadorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} valid Indian mobile number nahi hai`,
      },
    },

    academicDetails: academicSchema,

    graduationYear: {
      type: Number,
      required: true,
    },

    weeklyAvailabilityHours: {
      type: Number,
      required: true,
      min: 1,
      max: 168,
    },

    motivation: {
      type: String,
      required: true,
      minlength: 20,
    },

    socialMediaHandles: {
      linkedin: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CampusAmbassador", ambassadorSchema);
