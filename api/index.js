// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRouter from "./routes/user.route.js";
// import authRouter from "./routes/auth.route.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import listingRouter from "./routes/listing.route.js";
// dotenv.config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// const __dirname = path.resolve();



// const app = express();

// app.use(express.json());

// app.use(cookieParser());

// app.listen(3000, () => {
//   console.log("Server is running on port 3000!");
// });

// app.use("/api/user", userRouter);
// app.use("/api/auth", authRouter);
// app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, "client/dist")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// })


// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname } from "path";
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });



// Get the directory name of the current module's filename
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(4000, () => {
  console.log("Server is running on port 4000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files from the `/client1/dist` directory
app.use(express.static(path.join(__dirname, "dist")));

// Route all other requests to the 'index.html' file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

