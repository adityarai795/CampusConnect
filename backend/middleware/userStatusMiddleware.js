const checkUserStatus = async (req, res, next) => {
  try {
    const { user, userType } = req;

    // 1. Pehle check karo user ban toh nahi hai?
    if (user.accountStatus === "suspended" || user.isActive === false) {
      return res
        .status(403)
        .json({ message: "Aapka account block ya inactive hai." });
    }

    // 2. Agar user Teacher ya Student hai, toh uske Org ka status bhi check karo
    if (userType === "teacher" || userType === "student") {
      // Teacher ke liye experience array mein current org check karo
      // Student ke liye academicDetails mein status check karo
      const currentOrgId =
        userType === "teacher"
          ? user.experience.find((e) => e.isCurrent)?.organizationId
          : user.academicDetails.find((a) => a.status === "active")
              ?.organizationId;

      if (currentOrgId) {
        const Organization = require("./models/Organization");
        const org = await Organization.findById(currentOrgId);

        if (!org || !org.isActive) {
          return res
            .status(403)
            .json({ message: "your organization is currently inactive." });
        }
      }
    }

    next(); 
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = checkUserStatus;