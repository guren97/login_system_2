import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/userSchema.js";
import ErrorResponse from "../utils/errorResponse.js";

{
  /*
  #####################################################################################
                                       REGISTER USER
  #####################################################################################
  */
}
const register = asyncHandler(async (req, res, next) => {
  const { username, user_role, first_name, last_name, email, password } =
    req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "User with this username already exists"
          : "User with this email already exists";
      return next(new ErrorResponse(message, 401));
    }

    const user = await User.create({
      username,
      user_role,
      first_name,
      last_name,
      email,
      password,
    });

    //NOT WORKING
    // const userEmail = req.body.email;
    // const isValidEmail = await user.matchEmail(userEmail);
    // if (!isValidEmail) {
    //   return next(new ErrorResponse("Provide a valid email", 400));
    // }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});
{
  /*
  #####################################################################################
                                       GET USERS
  #####################################################################################
  */
}
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find(req.body);
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
});
{
  /*
  #####################################################################################
                                       GET USER BY :id
  #####################################################################################
  */
}
const getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new ErrorResponse("Invalid user id", 401));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
});

{
  /*
  #####################################################################################
                                       LOGIN USER
  #####################################################################################
  */
}

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 401));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const isMatchPassword = await user.matchPasswords(password);
    if (!isMatchPassword) {
      return next(new ErrorResponse("Wrong password", 401));
    }

    sendToken(user, 201, res);
    // Send a success response with a welcome message
    // res.status(200).json({
    //   success: true,
    //   message: `Logged in as ${user.user_role}, Welcome ${user.first_name}`,
    // });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
});
{
  /*
  #####################################################################################
                                       UPDATE USER
  #####################################################################################
  */
}
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new ErrorResponse("Invalid user id", 401));
  }

  const { username, email } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    const message =
      existingUser.username === username
        ? "User with this username already exists"
        : "User with this email already exists";
    return next(new ErrorResponse(message, 401));
  }
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    // If user not found, send an error response
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({
      succes: true,
      message: "Updated successfully",
      user,
    });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
});

{
  /*
  #####################################################################################
                                       UPDATE USER
  #####################################################################################
  */
}

const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
export { register, getUsers, getUserById, updateUser, login };
