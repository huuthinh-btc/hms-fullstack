import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
  try {
    // ✅ FIX: Đọc cả 2 format (lowercase và camelCase)
    const atoken = req.headers.atoken || req.headers.aToken;
    
    if (!atoken) {
      return res.json({
        success: false,
        message: "Unauthorized Access denied",
      });
    }
    
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;