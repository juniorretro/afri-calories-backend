// src/routes/user.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

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
router.put(
  '/me',
  authenticate,
  [
    body('name').optional().trim().isLength({ min: 2, max: 60 }),
    body('email').optional().isEmail().normalizeEmail(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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
  }
);

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
    const activeDays = new Set();

    for (const meal of meals) {
      activeDays.add(meal.date.toISOString().split('T')[0]);
      for (const item of meal.items) {
        totalCalories += (item.quantityGrams * item.food.caloriesPer100g) / 100;
      }
    }

    const daysWithData = activeDays.size || 1;
    const avgDailyCalories = totalCalories / daysWithData;

    res.json({
      totalMeals,
      totalCalories: Math.round(totalCalories),
      avgDailyCalories: Math.round(avgDailyCalories),
      activeDays: daysWithData,
      periodDays: 30,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
