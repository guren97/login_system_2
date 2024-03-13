// routes/auth.js
import express from "express";
const router = express.Router();

import {
  getUserById,
  getUsers,
  register,
  login,
  updateUser,
} from "../controllers/auth.js";
import { createUserPost } from "../controllers/post.js";

// Authentication routes
router.route("/register").post(register);
router.route("/getUsers").get(getUsers);
router.route("/getUserById/:id").get(getUserById);
//  LOGIN
router.route("/login").post(login);
//  UPDATE USER
router.route("/updateUser/:id").put(updateUser);

//  CREATE POST
router.route("/createUserPost/:id").post(createUserPost); // Add :id parameter here
export default router;
