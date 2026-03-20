// src/routes/meal.routes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

// Calcul calories: quantité * calories_per_100g / 100
const calculateCalories = (quantityGrams, caloriesPer100g) => {
  return (quantityGrams * caloriesPer100g) / 100;
};

const enrichMeal = (meal) => {
  const enrichedItems = meal.items.map((item) => {
    const calories = calculateCalories(
      item.quantityGrams,
      item.food.caloriesPer100g
    );
    const proteins = (item.quantityGrams * item.food.proteins) / 100;
    const carbs = (item.quantityGrams * item.food.carbs) / 100;
    const fats = (item.quantityGrams * item.food.fats) / 100;

    return { ...item, calories, proteins, carbs, fats };
  });

  const totalCalories = enrichedItems.reduce((sum, i) => sum + i.calories, 0);
  const totalProteins = enrichedItems.reduce((sum, i) => sum + i.proteins, 0);
  const totalCarbs = enrichedItems.reduce((sum, i) => sum + i.carbs, 0);
  const totalFats = enrichedItems.reduce((sum, i) => sum + i.fats, 0);

  return {
    ...meal,
    items: enrichedItems,
    totals: {
      calories: Math.round(totalCalories),
      proteins: Math.round(totalProteins * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fats: Math.round(totalFats * 10) / 10,
    },
  };
};

// GET /api/meals - Liste les repas de l'utilisateur
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { date, startDate, endDate } = req.query;

    const where = { userId: req.userId };

    if (date) {
      const day = new Date(date);
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      where.date = { gte: day, lt: nextDay };
    } else if (startDate && endDate) {
      where.date = { gte: new Date(startDate), lte: new Date(endDate) };
    }

    const meals = await prisma.meal.findMany({
      where,
      include: {
        items: {
          include: { food: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    const enrichedMeals = meals.map(enrichMeal);
    res.json(enrichedMeals);
  } catch (err) {
    next(err);
  }
});

// GET /api/meals/today/summary - Résumé du jour
router.get('/today/summary', authenticate, async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const meals = await prisma.meal.findMany({
      where: {
        userId: req.userId,
        date: { gte: today, lt: tomorrow },
      },
      include: {
        items: { include: { food: true } },
      },
    });

    const enrichedMeals = meals.map(enrichMeal);

    const summary = {
      date: today.toISOString().split('T')[0],
      meals: enrichedMeals,
      totalCalories: enrichedMeals.reduce(
        (sum, m) => sum + m.totals.calories,
        0
      ),
      totalProteins: Math.round(
        enrichedMeals.reduce((sum, m) => sum + m.totals.proteins, 0) * 10
      ) / 10,
      totalCarbs: Math.round(
        enrichedMeals.reduce((sum, m) => sum + m.totals.carbs, 0) * 10
      ) / 10,
      totalFats: Math.round(
        enrichedMeals.reduce((sum, m) => sum + m.totals.fats, 0) * 10
      ) / 10,
      mealCount: enrichedMeals.length,
    };

    res.json(summary);
  } catch (err) {
    next(err);
  }
});

// GET /api/meals/:id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { items: { include: { food: true } } },
    });

    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.json(enrichMeal(meal));
  } catch (err) {
    next(err);
  }
});

// POST /api/meals - Créer un repas
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { mealType, date, notes, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Meal must have at least one item' });
    }

    // Validate food IDs exist
    const foodIds = items.map((i) => i.foodId);
    const foods = await prisma.food.findMany({
      where: { id: { in: foodIds } },
    });
    if (foods.length !== foodIds.length) {
      return res.status(400).json({ error: 'One or more food items not found' });
    }

    const meal = await prisma.meal.create({
      data: {
        userId: req.userId,
        mealType: mealType || 'LUNCH',
        date: date ? new Date(date) : new Date(),
        notes,
        items: {
          create: items.map((item) => ({
            foodId: item.foodId,
            quantityGrams: parseFloat(item.quantityGrams),
          })),
        },
      },
      include: { items: { include: { food: true } } },
    });

    res.status(201).json(enrichMeal(meal));
  } catch (err) {
    next(err);
  }
});

// PUT /api/meals/:id - Modifier un repas
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { mealType, date, notes, items } = req.body;

    const existing = await prisma.meal.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!existing) return res.status(404).json({ error: 'Meal not found' });

    // Delete old items and recreate
    await prisma.mealItem.deleteMany({ where: { mealId: req.params.id } });

    const meal = await prisma.meal.update({
      where: { id: req.params.id },
      data: {
        mealType,
        date: date ? new Date(date) : undefined,
        notes,
        items: {
          create: items.map((item) => ({
            foodId: item.foodId,
            quantityGrams: parseFloat(item.quantityGrams),
          })),
        },
      },
      include: { items: { include: { food: true } } },
    });

    res.json(enrichMeal(meal));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/meals/:id
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const meal = await prisma.meal.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!meal) return res.status(404).json({ error: 'Meal not found' });

    await prisma.meal.delete({ where: { id: req.params.id } });
    res.json({ message: 'Meal deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// POST /api/meals/sync - Synchronisation offline
router.post('/sync', authenticate, async (req, res, next) => {
  try {
    const { meals: localMeals } = req.body;
    const created = [];

    for (const localMeal of localMeals) {
      try {
        const meal = await prisma.meal.create({
          data: {
            userId: req.userId,
            mealType: localMeal.mealType || 'LUNCH',
            date: new Date(localMeal.date),
            notes: localMeal.notes,
            items: {
              create: localMeal.items.map((item) => ({
                foodId: item.foodId,
                quantityGrams: parseFloat(item.quantityGrams),
              })),
            },
          },
          include: { items: { include: { food: true } } },
        });
        created.push(enrichMeal(meal));
      } catch (e) {
        console.error('Sync error for meal:', e.message);
      }
    }

    res.json({ synced: created.length, meals: created });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
