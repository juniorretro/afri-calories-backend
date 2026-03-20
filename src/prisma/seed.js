// src/prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const africanFoods = [
  // ── PLATS ────────────────────────────────────────────────────────────────
  { name: 'Ndolé', nameFr: 'Ndolé', category: 'Plat', caloriesPer100g: 250, proteins: 15, carbs: 10, fats: 18, fiber: 3.0, country: 'Cameroun', description: 'Plat national du Cameroun à base de feuilles de ndolé et arachides' },
  { name: 'Ndolé viande', nameFr: 'Ndolé viande', category: 'Plat', caloriesPer100g: 280, proteins: 16, carbs: 12, fats: 20, fiber: 3.0, country: 'Cameroun', description: 'Ndolé avec viande de bœuf ou de mouton' },
  { name: 'Ndolé poisson', nameFr: 'Ndolé poisson', category: 'Plat', caloriesPer100g: 240, proteins: 18, carbs: 10, fats: 16, fiber: 3.0, country: 'Cameroun', description: 'Ndolé aux crevettes ou poisson fumé' },
  { name: 'Eru', nameFr: 'Eru', category: 'Plat', caloriesPer100g: 260, proteins: 15, carbs: 8, fats: 20, fiber: 4.5, country: 'Cameroun', description: 'Soupe de feuilles d\'eru avec huile de palme' },
  { name: 'Eru viande', nameFr: 'Eru viande', category: 'Plat', caloriesPer100g: 280, proteins: 16, carbs: 9, fats: 21, fiber: 4.5, country: 'Cameroun', description: 'Eru avec viande fumée' },
  { name: 'Eru poisson', nameFr: 'Eru poisson', category: 'Plat', caloriesPer100g: 230, proteins: 17, carbs: 7, fats: 17, fiber: 4.5, country: 'Cameroun', description: 'Eru avec poisson fumé' },
  { name: 'Okok', nameFr: 'Okok', category: 'Plat', caloriesPer100g: 270, proteins: 14, carbs: 10, fats: 20, fiber: 4.0, country: 'Cameroun', description: 'Feuilles d\'okok mijotées avec épices et huile de palme' },
  { name: 'Koki', nameFr: 'Koki', category: 'Plat', caloriesPer100g: 300, proteins: 12, carbs: 30, fats: 16, fiber: 5.0, country: 'Cameroun', description: 'Gâteau de haricots cuit à la vapeur dans des feuilles de bananier' },
  { name: 'Kondré', nameFr: 'Kondré', category: 'Plat', caloriesPer100g: 220, proteins: 14, carbs: 28, fats: 8, fiber: 3.5, country: 'Cameroun', description: 'Ragoût de plantain vert et chèvre, spécialité bamiléké' },
  { name: 'Mbongo tchobi', nameFr: 'Mbongo tchobi', category: 'Plat', caloriesPer100g: 230, proteins: 20, carbs: 6, fats: 14, fiber: 2.0, country: 'Cameroun', description: 'Sauce noire épicée à base de charbon de bois et de poisson ou viande' },
  { name: 'Achu soup jaune', nameFr: 'Achu soupe jaune', category: 'Plat', caloriesPer100g: 290, proteins: 12, carbs: 18, fats: 22, fiber: 2.5, country: 'Cameroun', description: 'Soupe jaune à base d\'huile de palme et épices, accompagnée d\'achu' },
  { name: 'Ekwang', nameFr: 'Ekwang', category: 'Plat', caloriesPer100g: 260, proteins: 10, carbs: 22, fats: 16, fiber: 3.0, country: 'Cameroun', description: 'Taro râpé enveloppé dans des feuilles de taro et cuit à l\'huile de palme' },
  { name: 'Soupe pistache', nameFr: 'Soupe pistache', category: 'Plat', caloriesPer100g: 300, proteins: 18, carbs: 10, fats: 22, fiber: 3.5, country: 'Cameroun', description: 'Soupe épaisse à base de graines de courge moulues (pistache)' },
  { name: 'Sauce gombo', nameFr: 'Sauce gombo', category: 'Plat', caloriesPer100g: 150, proteins: 6, carbs: 10, fats: 9, fiber: 3.2, country: 'Afrique Centrale', description: 'Sauce visqueuse à base de gombos frais ou séchés' },
  { name: 'Haricot sauce', nameFr: 'Haricot sauce', category: 'Plat', caloriesPer100g: 180, proteins: 9, carbs: 25, fats: 5, fiber: 6.0, country: 'Cameroun', description: 'Haricots en sauce tomate et épices' },
  { name: 'Saka saka', nameFr: 'Saka saka', category: 'Plat', caloriesPer100g: 200, proteins: 8, carbs: 12, fats: 14, fiber: 5.0, country: 'Afrique Centrale', description: 'Feuilles de manioc pilées mijotées à l\'huile de palme' },

  // ── PROTÉINES ─────────────────────────────────────────────────────────────
  { name: 'Poulet braisé', nameFr: 'Poulet braisé', category: 'Protéine', caloriesPer100g: 250, proteins: 27, carbs: 2, fats: 15, fiber: 0, country: 'Cameroun', description: 'Poulet mariné et grillé au charbon de bois' },
  { name: 'Poulet sauce', nameFr: 'Poulet en sauce', category: 'Protéine', caloriesPer100g: 230, proteins: 25, carbs: 3, fats: 14, fiber: 0.5, country: 'Cameroun', description: 'Poulet mijoté dans une sauce épicée' },
  { name: 'Poisson braisé', nameFr: 'Poisson braisé', category: 'Protéine', caloriesPer100g: 220, proteins: 25, carbs: 1, fats: 12, fiber: 0, country: 'Cameroun', description: 'Poisson entier grillé au charbon avec épices' },
  { name: 'Poisson frit', nameFr: 'Poisson frit', category: 'Protéine', caloriesPer100g: 250, proteins: 24, carbs: 1, fats: 18, fiber: 0, country: 'Cameroun', description: 'Poisson frit dans l\'huile avec épices' },
  { name: 'Viande boeuf sauce', nameFr: 'Viande bœuf en sauce', category: 'Protéine', caloriesPer100g: 250, proteins: 26, carbs: 5, fats: 16, fiber: 0.5, country: 'Cameroun', description: 'Bœuf mijoté en sauce tomate et épices' },
  { name: 'Chèvre braisée', nameFr: 'Chèvre braisée', category: 'Protéine', caloriesPer100g: 260, proteins: 25, carbs: 3, fats: 18, fiber: 0, country: 'Cameroun', description: 'Viande de chèvre marinée et grillée au charbon' },
  { name: 'Porc braisé', nameFr: 'Porc braisé', category: 'Protéine', caloriesPer100g: 270, proteins: 24, carbs: 4, fats: 20, fiber: 0, country: 'Cameroun', description: 'Porc grillé au charbon, souvent servi avec piment' },
  { name: 'Oeuf bouilli', nameFr: 'Œuf bouilli', category: 'Protéine', caloriesPer100g: 155, proteins: 13, carbs: 1, fats: 11, fiber: 0, country: 'Afrique', description: 'Œuf de poule cuit à l\'eau' },
  { name: 'Omelette', nameFr: 'Omelette', category: 'Protéine', caloriesPer100g: 190, proteins: 13, carbs: 2, fats: 15, fiber: 0, country: 'Afrique', description: 'Omelette aux oignons et tomates' },

  // ── ACCOMPAGNEMENTS ──────────────────────────────────────────────────────
  { name: 'Riz blanc', nameFr: 'Riz blanc cuit', category: 'Accompagnement', caloriesPer100g: 130, proteins: 2.5, carbs: 28, fats: 0.3, fiber: 0.4, country: 'Afrique', description: 'Riz blanc cuit à l\'eau' },
  { name: 'Riz sauté', nameFr: 'Riz sauté', category: 'Accompagnement', caloriesPer100g: 200, proteins: 5, carbs: 32, fats: 6, fiber: 0.5, country: 'Cameroun', description: 'Riz sauté à l\'huile avec légumes et épices' },
  { name: 'Riz gras', nameFr: 'Riz gras', category: 'Accompagnement', caloriesPer100g: 250, proteins: 5, carbs: 35, fats: 10, fiber: 0.5, country: 'Cameroun', description: 'Riz cuit dans un bouillon gras avec légumes' },
  { name: 'Spaghetti sauté', nameFr: 'Spaghetti sauté', category: 'Accompagnement', caloriesPer100g: 210, proteins: 6, carbs: 30, fats: 7, fiber: 1.0, country: 'Cameroun', description: 'Spaghetti sautés à l\'huile, tomates et épices' },
  { name: 'Macaroni', nameFr: 'Macaroni', category: 'Accompagnement', caloriesPer100g: 190, proteins: 6, carbs: 33, fats: 2, fiber: 1.0, country: 'Cameroun', description: 'Macaroni cuit, souvent sauté ou en sauce' },
  { name: 'Plantain frit', nameFr: 'Plantain frit', category: 'Accompagnement', caloriesPer100g: 300, proteins: 2, carbs: 40, fats: 17, fiber: 2.3, country: 'Cameroun', description: 'Banane plantain mûre frite dans l\'huile' },
  { name: 'Plantain bouilli', nameFr: 'Plantain bouilli', category: 'Accompagnement', caloriesPer100g: 120, proteins: 1.5, carbs: 31, fats: 0.3, fiber: 2.0, country: 'Afrique Centrale', description: 'Plantain vert bouilli à l\'eau' },
  { name: 'Plantain braisé', nameFr: 'Plantain braisé', category: 'Accompagnement', caloriesPer100g: 180, proteins: 1.8, carbs: 32, fats: 5, fiber: 2.0, country: 'Cameroun', description: 'Plantain grillé sur braise ou au four' },
  { name: 'Fufu maïs', nameFr: 'Fufu de maïs', category: 'Accompagnement', caloriesPer100g: 200, proteins: 3, carbs: 45, fats: 0.5, fiber: 1.5, country: 'Cameroun', description: 'Pâte de farine de maïs cuite à l\'eau' },
  { name: 'Fufu manioc', nameFr: 'Fufu de manioc', category: 'Accompagnement', caloriesPer100g: 180, proteins: 1.5, carbs: 42, fats: 0.3, fiber: 1.8, country: 'Afrique Centrale', description: 'Pâte de manioc cuit et pilé' },
  { name: 'Couscous maïs', nameFr: 'Couscous de maïs', category: 'Accompagnement', caloriesPer100g: 170, proteins: 3, carbs: 38, fats: 0.5, fiber: 2.0, country: 'Cameroun', description: 'Semoule de maïs cuite à la vapeur' },
  { name: 'Couscous mil', nameFr: 'Couscous de mil', category: 'Accompagnement', caloriesPer100g: 160, proteins: 3, carbs: 36, fats: 0.4, fiber: 2.5, country: 'Cameroun', description: 'Semoule de mil cuite, spécialité du Nord-Cameroun' },
  { name: 'Garri', nameFr: 'Garri', category: 'Accompagnement', caloriesPer100g: 360, proteins: 1, carbs: 88, fats: 0.5, fiber: 1.5, country: 'Afrique de l\'Ouest', description: 'Semoule de manioc fermenté et grillé' },
  { name: 'Bâton de manioc (bobolo)', nameFr: 'Bâton de manioc / Bobolo', category: 'Accompagnement', caloriesPer100g: 160, proteins: 1.5, carbs: 38, fats: 0.3, fiber: 1.5, country: 'Cameroun', description: 'Manioc fermenté et cuit emballé dans des feuilles de bananier' },
  { name: 'Miondo', nameFr: 'Miondo', category: 'Accompagnement', caloriesPer100g: 150, proteins: 1.2, carbs: 36, fats: 0.2, fiber: 1.3, country: 'Cameroun', description: 'Bâton de manioc plus fin, spécialité du Sud-Cameroun' },
  { name: 'Tapioca', nameFr: 'Tapioca', category: 'Accompagnement', caloriesPer100g: 180, proteins: 1.5, carbs: 43, fats: 0.2, fiber: 0.5, country: 'Cameroun', description: 'Grains de manioc séchés cuits à la vapeur ou frits' },
  { name: 'Taro', nameFr: 'Taro bouilli', category: 'Accompagnement', caloriesPer100g: 140, proteins: 2, carbs: 34, fats: 0.4, fiber: 4.0, country: 'Cameroun', description: 'Tubercule de taro cuit à l\'eau' },
  { name: 'Igname bouilli', nameFr: 'Igname bouilli', category: 'Accompagnement', caloriesPer100g: 120, proteins: 2, carbs: 28, fats: 0.3, fiber: 3.0, country: 'Afrique de l\'Ouest', description: 'Tubercule d\'igname cuit à l\'eau' },
  { name: 'Patate douce bouillie', nameFr: 'Patate douce bouillie', category: 'Accompagnement', caloriesPer100g: 110, proteins: 1.5, carbs: 26, fats: 0.2, fiber: 3.0, country: 'Afrique', description: 'Patate douce cuite à l\'eau' },

  // ── SNACKS ────────────────────────────────────────────────────────────────
  { name: 'Beignets', nameFr: 'Beignets', category: 'Snack', caloriesPer100g: 350, proteins: 6, carbs: 50, fats: 15, fiber: 1.5, country: 'Afrique', description: 'Beignets frits sucrés ou salés' },
  { name: 'Beignet haricot', nameFr: 'Beignet de haricot (Accara)', category: 'Snack', caloriesPer100g: 320, proteins: 8, carbs: 45, fats: 14, fiber: 4.0, country: 'Afrique de l\'Ouest', description: 'Beignets de haricots niébé épicés et frits' },
  { name: 'Beignet farine', nameFr: 'Beignet de farine', category: 'Snack', caloriesPer100g: 340, proteins: 6, carbs: 48, fats: 15, fiber: 1.0, country: 'Cameroun', description: 'Beignets légers frits à base de farine de blé' },
  { name: 'Puff puff', nameFr: 'Puff puff', category: 'Snack', caloriesPer100g: 360, proteins: 5, carbs: 52, fats: 16, fiber: 1.0, country: 'Cameroun', description: 'Boules de pâte gonflées et frites, sucrées ou salées' },
  { name: 'Pain', nameFr: 'Pain', category: 'Snack', caloriesPer100g: 270, proteins: 9, carbs: 50, fats: 3, fiber: 2.5, country: 'Afrique', description: 'Pain blanc de boulangerie' },
  { name: 'Pain + omelette', nameFr: 'Pain-omelette', category: 'Snack', caloriesPer100g: 350, proteins: 18, carbs: 52, fats: 15, fiber: 1.5, country: 'Cameroun', description: 'Sandwich pain fourré à l\'omelette, street food populaire' },
  { name: 'Pain + haricot', nameFr: 'Pain-haricot', category: 'Snack', caloriesPer100g: 360, proteins: 18, carbs: 58, fats: 14, fiber: 5.0, country: 'Cameroun', description: 'Sandwich pain fourré aux haricots, street food très courant' },

  // ── BOISSONS ──────────────────────────────────────────────────────────────
  { name: 'Bouillie maïs', nameFr: 'Bouillie de maïs', category: 'Boisson', caloriesPer100g: 120, proteins: 3, carbs: 25, fats: 2, fiber: 1.0, country: 'Cameroun', description: 'Bouillie chaude de farine de maïs, souvent sucrée' },
  { name: 'Bouillie mil', nameFr: 'Bouillie de mil', category: 'Boisson', caloriesPer100g: 110, proteins: 3, carbs: 24, fats: 1.5, fiber: 1.5, country: 'Cameroun', description: 'Bouillie chaude de farine de mil, riche en minéraux' },
  { name: 'Bouillie soja', nameFr: 'Bouillie de soja', category: 'Boisson', caloriesPer100g: 130, proteins: 4, carbs: 22, fats: 3, fiber: 1.0, country: 'Cameroun', description: 'Bouillie enrichie de farine de soja' },
  { name: 'Jus bissap', nameFr: 'Jus de bissap', category: 'Boisson', caloriesPer100g: 45, proteins: 0.5, carbs: 11, fats: 0, fiber: 0.5, country: 'Afrique de l\'Ouest', description: 'Boisson rafraîchissante à base de fleurs d\'hibiscus séchées' },
  { name: 'Jus gingembre', nameFr: 'Jus de gingembre', category: 'Boisson', caloriesPer100g: 50, proteins: 0.5, carbs: 12, fats: 0, fiber: 0.3, country: 'Afrique', description: 'Boisson épicée et rafraîchissante au gingembre frais' },
  { name: 'Jus ananas', nameFr: 'Jus d\'ananas', category: 'Boisson', caloriesPer100g: 45, proteins: 0.5, carbs: 11, fats: 0, fiber: 0.3, country: 'Cameroun', description: 'Jus naturel d\'ananas frais' },
  { name: 'Jus tamarin', nameFr: 'Jus de tamarin', category: 'Boisson', caloriesPer100g: 48, proteins: 0.5, carbs: 12, fats: 0, fiber: 0.5, country: 'Afrique', description: 'Boisson acidulée à base de pulpe de tamarin' },

  // ── SUPPLÉMENTS / INGRÉDIENTS ─────────────────────────────────────────────
  { name: 'Sucre', nameFr: 'Sucre blanc', category: 'Supplément', caloriesPer100g: 400, proteins: 0, carbs: 100, fats: 0, fiber: 0, country: 'Afrique', description: 'Sucre raffiné' },
  { name: 'Huile rouge', nameFr: 'Huile de palme rouge', category: 'Supplément', caloriesPer100g: 900, proteins: 0, carbs: 0, fats: 100, fiber: 0, country: 'Afrique Centrale', description: 'Huile de palme brute, ingrédient essentiel de la cuisine africaine' },
  { name: 'Huile végétale', nameFr: 'Huile végétale', category: 'Supplément', caloriesPer100g: 900, proteins: 0, carbs: 0, fats: 100, fiber: 0, country: 'Afrique', description: 'Huile végétale raffinée pour cuisson' },
  { name: 'Arachide', nameFr: 'Arachide', category: 'Supplément', caloriesPer100g: 567, proteins: 25, carbs: 16, fats: 49, fiber: 8.5, country: 'Afrique', description: 'Cacahuètes crues ou grillées, très utilisées en cuisine africaine' },
  { name: 'Pistache', nameFr: 'Pistache africaine', category: 'Supplément', caloriesPer100g: 562, proteins: 20, carbs: 28, fats: 45, fiber: 6.0, country: 'Cameroun', description: 'Graines de courge (appelées pistache au Cameroun), riches en protéines' },
  { name: 'Poivre', nameFr: 'Poivre', category: 'Supplément', caloriesPer100g: 255, proteins: 11, carbs: 64, fats: 3.3, fiber: 25.0, country: 'Afrique', description: 'Épice de base, grains de poivre noir ou blanc' },
  { name: 'Sel', nameFr: 'Sel', category: 'Supplément', caloriesPer100g: 0, proteins: 0, carbs: 0, fats: 0, fiber: 0, country: 'Afrique', description: 'Sel de table' },
  { name: 'Cube magie', nameFr: 'Cube Maggi', category: 'Supplément', caloriesPer100g: 8, proteins: 0.5, carbs: 1, fats: 0, fiber: 0, country: 'Afrique', description: 'Bouillon en cube très utilisé pour assaisonner les plats africains' },

  // ── SAUCES ────────────────────────────────────────────────────────────────
  { name: 'Sauce tomate', nameFr: 'Sauce tomate', category: 'Sauce', caloriesPer100g: 35, proteins: 1, carbs: 7, fats: 0.2, fiber: 1.5, country: 'Afrique', description: 'Sauce à base de tomates fraîches ou concentrées' },
  { name: 'Sauce arachide', nameFr: 'Sauce arachide', category: 'Sauce', caloriesPer100g: 280, proteins: 10, carbs: 12, fats: 22, fiber: 2.5, country: 'Cameroun', description: 'Sauce épaisse à base de pâte d\'arachide' },
  { name: 'Sauce feuille', nameFr: 'Sauce feuille', category: 'Sauce', caloriesPer100g: 150, proteins: 6, carbs: 10, fats: 8, fiber: 4.0, country: 'Cameroun', description: 'Sauce à base de feuilles vertes et huile de palme' },
];

async function main() {
  console.log('🌍 Chargement de la base de données alimentaire africaine...\n');

  let created = 0;
  let updated = 0;

  for (const food of africanFoods) {
    const existing = await prisma.food.findUnique({ where: { name: food.name } });
    if (existing) {
      await prisma.food.update({ where: { name: food.name }, data: food });
      updated++;
    } else {
      await prisma.food.create({ data: food });
      created++;
    }
  }

  // Résumé par catégorie
  const byCategory = africanFoods.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  const emojis = {
    'Plat': '🍲', 'Protéine': '💪', 'Accompagnement': '🍚',
    'Snack': '🥜', 'Boisson': '🥤', 'Supplément': '🧂', 'Sauce': '🫙',
  };

  console.log('✅ Seed terminé:\n');
  console.log(`   Total : ${africanFoods.length} aliments (${created} créés, ${updated} mis à jour)\n`);
  console.log('📊 Répartition par catégorie:');
  Object.entries(byCategory).forEach(([cat, count]) => {
    const emoji = emojis[cat] || '•';
    console.log(`   ${emoji}  ${cat.padEnd(16)} ${count} aliments`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
