// src/routes/food.routes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

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

// POST /api/foods - Créer un plat (admin)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const food = await prisma.food.create({ data: req.body });
    res.status(201).json(food);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
