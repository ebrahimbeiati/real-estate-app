import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controller/user.controller.js";

const app = express();
const router = express.Router();

app.post("/api/user/update/:id", verifyToken, updateUser);

export default router;
