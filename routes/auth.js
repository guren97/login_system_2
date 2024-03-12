import express from "express";
const router = express.Router();

import { getUsers, register } from "../controllers/auth.js";

router.route("/register").post(register);
router.route("/getUsers").get(getUsers);

export default router;
