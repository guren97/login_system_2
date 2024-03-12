// routes/auth.js
import express from "express";
const router = express.Router();

import { getUserById, getUsers, register } from "../controllers/auth.js";
import { createUserPost } from "../controllers/post.js";

// Authentication routes
router.route("/register").post(register);
router.route("/getUsers").get(getUsers);
router.route("/getUserById/:id").get(getUserById);

router.route("/createUserPost/:id").post(createUserPost); // Add :id parameter here
export default router;
