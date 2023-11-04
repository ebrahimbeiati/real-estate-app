import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
// export const verifyToken = (req, res, next) => {
//   const token = req.cookie.access_token;
//   if (!token) return next(errorHandler(401, "Unauthorized"));
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, "Token is not valid"));
//     req.user = user;
//     next();
//   });
  
// }
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Use 'cookies' instead of 'cookie'
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
