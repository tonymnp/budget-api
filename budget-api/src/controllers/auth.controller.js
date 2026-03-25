import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../models/prisma.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const register = async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "invalid input",
        details: parsed.error.flatten()
      });
    }

    const { email, password } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({
        error: "email already in use"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash
      },
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });

    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "invalid input",
        details: parsed.error.flatten()
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: "invalid credentials"
      });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({
        error: "invalid credentials"
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};