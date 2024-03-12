import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js";

const register = asyncHandler(async (req, res, next) => {
  const { username, user_role, first_name, last_name, email, password } =
    req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "user with this username already exists"
          : "User with this email already exists";

      return res.json({ message });
    }

    const user = await User.create({
      username,
      user_role,
      first_name,
      last_name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find(req.body);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot retrieve users from database",
      error: error.message,
    });
  }
});

export { register, getUsers };
