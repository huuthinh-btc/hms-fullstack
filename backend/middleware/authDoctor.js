import jwt from "jsonwebtoken";

// Doctor Authentication Middleware
const authDoctor = async (req, res, next) => {
  try {
    // ✅ FIX: Đọc cả 2 format (lowercase và camelCase)
    const dtoken = req.headers.dtoken || req.headers.dToken;
    
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Unauthorized Access denied",
      });
    }
    
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;