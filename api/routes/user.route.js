import express from "express";
import jwt from "jsonwebtoken";
import  {verifyToken}  from "../utils/verifyUser.js"; 
import { updateUser } from "../controller/user.controller.js";

const router = express.Router();
router.post("/update/:id",  updateUser);

export default router;



// import express from "express";
// import jwt from "jsonwebtoken";
// import updateUser from "../controllers/user.controller.js";
// import { verifyToken } from "../utils/verifyUser.js";

// const router = express.Router();
// router.post("/update/:id", verifyToken, updateUser);


// export default router;