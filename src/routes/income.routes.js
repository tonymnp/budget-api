import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createIncome,
  getIncomes
} from "../controllers/income.controller.js";

const router = express.Router();

router.post("/", authenticate, createIncome);
router.get("/", authenticate, getIncomes);

export default router;