import express from "express";


const router = express.Router();
router.get("/", (req, res) => {
    res.send("Hello World!22");

});

export default router;