import { prisma } from "../models/prisma.js";
import { transactionSchema } from "../validators/transaction.validator.js";

export const createExpense = async (req, res, next) => {
  try {
    const parsed = transactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "invalid input",
        details: parsed.error.flatten()
      });
    }

    const { amount, category } = parsed.data;

    const expense = await prisma.expense.create({
      data: {
        amount,
        category,
        userId: req.user.userId
      }
    });

    return res.status(201).json(expense);
  } catch (err) {
    return next(err);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(expenses);
  } catch (err) {
    return next(err);
  }
};