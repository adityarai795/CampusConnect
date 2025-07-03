const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
name:{
  type:String,
},
email:{
    type:String,
    required:true,
    unique:true
},
username:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
profilePicture:{
    type:String,
    default:"https://www.w3schools.com/howto/img_avatar.png"
},
bio:{
    type:String,
    default:"This is my bio"
},


},{
  timestamps: true
});

const User=mongoose.model('User',userSchema);

module.exports=User;