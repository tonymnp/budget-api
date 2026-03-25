import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {

  res.json({
    message: "you are authenticated",
    user: req.user
  });

});

export default router;