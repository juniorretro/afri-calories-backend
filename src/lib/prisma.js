// src/lib/prisma.js — singleton partagé entre toutes les routes
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
