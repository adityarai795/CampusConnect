const Organization = require("../models/OrginazationSchema.js")


module.exports.createOrganization = async (req, res) => {
  try {
    const { name, email, mobileno, password, orgType } = req.body;

    // Basic validation
    if (!name || !email || !mobileno) {
      return res
        .status(400)
        .json({ message: "Sare fields bharna zaroori hai." });
    }
    const newOrganization = new Organization({
      name,
      email,
      mobileno, 
      password,
      orgType,
      isActive: true,
    });
    await newOrganization.save();
    res
      .status(201)
      .json({
        message: "Organization successfully created",
        organization: newOrganization,
      });
  } catch (error) {
    console.log
    res.status(500).json({ message: error.message || "Internal Server Error"  });
  }
};



module.exports.getAllOrginazation = async (req, res) => {
  try {
    const allOrg = await Organization.find();
    if (!allOrg) {
      return res.status(404).json({ message: "Something went wrong org not found" });
    }
      res.status(200).json({ message: "Suscess", data: allOrg });
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports.updateOrginazation = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}