import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  getExpenses
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", authenticate, createExpense);
router.get("/", authenticate, getExpenses);

export default router;