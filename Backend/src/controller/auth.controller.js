import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function RegisterController(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPass,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("Token", token);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function LoginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("Token", token);

    res.status(200).json({
      success: true,
      message: "Loggedin Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function LogoutController(req, res, next) {
  try {
    res.clearCookie("Token");

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (err) {
    next(err);
  }
}

async function GetMeController(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function ChangePasswordController(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    next(err);
  }
}

export default {
  RegisterController,
  LoginController,
  LogoutController,
  GetMeController,
  ChangePasswordController,
};
