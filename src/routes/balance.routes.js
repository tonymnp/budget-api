import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getBalance } from "../controllers/balance.controller.js";

const router = express.Router();

router.get("/", authenticate, getBalance);

export default router;