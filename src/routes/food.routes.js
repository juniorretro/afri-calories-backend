// src/routes/food.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../lib/prisma');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// GET /api/foods - Liste tous les plats
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { search, category, country, page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameFr: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) where.category = category;
    if (country) where.country = { contains: country, mode: 'insensitive' };

    const [foods, total] = await Promise.all([
      prisma.food.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { name: 'asc' },
      }),
      prisma.food.count({ where }),
    ]);

    res.json({
      data: foods,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/foods/categories - Liste des catégories
router.get('/categories', authenticate, async (req, res, next) => {
  try {
    const categories = await prisma.food.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });
    res.json(categories.map((c) => c.category));
  } catch (err) {
    next(err);
  }
});

// GET /api/foods/:id - Détail d'un plat
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id: req.params.id },
    });
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.json(food);
  } catch (err) {
    next(err);
  }
});

// POST /api/foods - Créer un plat (validé et sanitisé)
router.post(
  '/',
  authenticate,
  [
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('category').trim().notEmpty(),
    body('caloriesPer100g').isFloat({ min: 0, max: 9000 }),
    body('proteins').optional().isFloat({ min: 0, max: 100 }),
    body('carbs').optional().isFloat({ min: 0, max: 100 }),
    body('fats').optional().isFloat({ min: 0, max: 100 }),
    body('fiber').optional().isFloat({ min: 0, max: 100 }),
    body('country').optional().trim().isLength({ max: 60 }),
    body('description').optional().trim().isLength({ max: 500 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, nameFr, category, caloriesPer100g, proteins, carbs, fats, fiber, country, description, imageUrl } = req.body;

      const food = await prisma.food.create({
        data: { name, nameFr, category, caloriesPer100g, proteins, carbs, fats, fiber, country, description, imageUrl },
      });
      res.status(201).json(food);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
