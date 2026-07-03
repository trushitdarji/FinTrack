import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function RegisterController(req, res) {
  const { name, email, password } = req.body;

  const emailExists = await userModel.findOne({ email });

  if (emailExists) {
    return res.status(400).json({
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

  res.cookie("token", token);

  return res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { email, password } = req.body;
}

export default {
  RegisterController,
};
