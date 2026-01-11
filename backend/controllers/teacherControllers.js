const Teacher = require("../models/TeacherSchema.js");

module.exports.createTeacher = async (req, res) => {
  try {
    const { name, email, password, mobileno } = req.body;
    // Basic validation
    if (!name || !email || !password || !mobileno) {
      return res
        .status(400)
        .json({ message: "Please fill the basic fields" });
    }
    const newTeacher = new Teacher({
      name,
      email,
      password,
      mobileno,
      role: "teacher",
    });
    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher successfully created", teacher: newTeacher });  
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"  });
    
  }
}


module.exports.getAllTeacher = async (req, res) => {
  try {
    const allTeacher = await Teacher.find();
    if (!allTeacher) {
      return res.status(404).json({ message: "Something went wrong teacher not found" });
    }
      res.status(200).json({ message: "Success", data: allTeacher });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateTeacher = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};