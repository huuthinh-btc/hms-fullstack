import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const legacyToken = req.headers.dtoken; // frontend cũ gửi dtoken cho doctor

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

    if (token_decode.role !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Doctor only",
      });
    }

    req.doctor = token_decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
