// src/routes/user.routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/users/me
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me
router.put('/me', authenticate, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { name, email },
      select: { id: true, email: true, name: true, updatedAt: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/me/stats
router.get('/me/stats', authenticate, async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const meals = await prisma.meal.findMany({
      where: { userId: req.userId, date: { gte: thirtyDaysAgo } },
      include: { items: { include: { food: true } } },
    });

    const totalMeals = meals.length;
    let totalCalories = 0;

    for (const meal of meals) {
      for (const item of meal.items) {
        totalCalories += (item.quantityGrams * item.food.caloriesPer100g) / 100;
      }
    }

    const avgDailyCalories = totalMeals > 0 ? totalCalories / 30 : 0;

    res.json({
      totalMeals,
      totalCalories: Math.round(totalCalories),
      avgDailyCalories: Math.round(avgDailyCalories),
      periodDays: 30,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
