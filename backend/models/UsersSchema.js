const mongoose=require('mongoose');

const academicSchema = new mongoose.Schema({
    university: {
        type: String,
    },
    Branch: {
        type:String,
    }
})
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileno: {
      type: Number,
      default: 1234567890,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    academicDetails: {
        type: [academicSchema],
        default:[]
    },
    bio: {
      type: String,
      default: "This is my bio",
    },
    usedResources: {
      type: [String],
      default: [],
    },
    totalBlogPosts: {
      type: Number,
      default: 0,
    },
    leetcodeUsername: {
      type: String,
      default: "",
    },
    totalAciveDays: {
      type: Number,
      default: 0,
    },
    activitylog: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

const User=mongoose.model('User',userSchema);

module.exports=User;