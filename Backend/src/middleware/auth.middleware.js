import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({
        success:false,
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
}

export default authMiddleware;
