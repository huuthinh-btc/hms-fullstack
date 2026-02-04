import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const legacyToken = req.headers.token; // frontend cũ gửi

    // Nhận cả 2 kiểu: Bearer (mới) và token (cũ)
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
    req.user = token_decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
