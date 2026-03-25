import { prisma } from "../models/prisma.js";
import { transactionSchema } from "../validators/transaction.validator.js";

export const createIncome = async (req, res, next) => {
  try {
    const parsed = transactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "invalid input",
        details: parsed.error.flatten()
      });
    }

    const { amount, category } = parsed.data;

    const income = await prisma.income.create({
      data: {
        amount,
        category,
        userId: req.user.userId
      }
    });

    return res.status(201).json(income);
  } catch (err) {
    return next(err);
  }
};

export const getIncomes = async (req, res, next) => {
  try {
    const incomes = await prisma.income.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(incomes);
  } catch (err) {
    return next(err);
  }
};