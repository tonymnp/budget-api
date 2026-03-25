import { prisma } from "../models/prisma.js";

export const getBalance = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const incomes = await prisma.income.findMany({
      where: { userId }
    });

    const expenses = await prisma.expense.findMany({
      where: { userId }
    });

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const balance = totalIncome - totalExpense;

    return res.json({
      totalIncome,
      totalExpense,
      balance
    });
  } catch (err) {
    return next(err);
  }
};