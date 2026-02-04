import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const legacyToken = req.headers.atoken; // frontend cũ gửi atoken cho admin

    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (legacyToken) {
      token = legacyToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access denied",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Admin only",
      });
    }

    req.admin = token_decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authAdmin;
