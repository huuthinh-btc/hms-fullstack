import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access denied",
      });
    }

    const token = authHeader.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = token_decode;   // gắn user từ token

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
