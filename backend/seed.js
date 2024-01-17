/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // USER
    const user = [
      {
        firstname: "Julie",
        lastname: "Bérard",
        email: "JulieBerard@armyspy.com",
        password: "Sheif7aezah",
        age: 25,
        city: "Paris",
        country: "France",
        skin_id_1: 5,
        skin_id_2: 6,
        skin_id_3: 1,
      },
      {
        firstname: "Bjron",
        lastname: "Mårtensson",
        email: "BjronMartensson@rhyta.com",
        password: "Keit6oowu4b",
        age: 52,
        city: "stockholm",
        country: "Suède",
        skin_id_1: 5,
        skin_id_2: 3,
        skin_id_3: 7,
      },
      {
        firstname: "Monica",
        lastname: "Schiavone",
        email: "MonicaSchiavone@teleworm.us",
        password: "azieXohgh5",
        age: 38,
        city: "Naples",
        country: "Italie",
        skin_id_1: 2,
        skin_id_2: 6,
        skin_id_3: 1,
      },
    ];

    // SKIN
    const skin = [
      "Peau fatiguée",
      "Peau grasse",
      "Peau mature",
      "Peau normale à mixte",
      "Peau sèche",
      "Peau sensible",
      "Peau terne",
      "Tous types de peaux",
    ];

    // PRODUCT
    const product = [
      {
        name: "Revitalift Filler Sérum Yeux 2,5% Acide Hyaluronique + Caféine",
        description:
          "Découvrez notre premier sérum spécifique pour les yeux ! Notre plus haute concentration d'Acide Hyaluronique et de Caféine pour repulper toutes les rides du contour de l'oeil et réduire les cernes",
        price: 14.99,
        image:
          "./public/assets/images/REVITALIFT FILLER SÉRUM YEUX 2,5% ACIDE HYALURONIQUE + CAFÉINE.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/serum-et-ampoules-visage/revitalift-filler-serum-yeux-2-5--acide-hyaluronique-cafeine/OAP7183.html",
        category_id: 3,
        sub_cat_id_1: 3,
        sub_cat_id_2: 2,
        sub_cat_id_3: 13,
        skinId_1: 8,
      },

      {
        name: "Sucres de soin gommage purifiant",
        description:
          "Les Laboratoires L'Oréal Paris ont sélectionné 3 SUCRES FINS et les ont associés à des PÉPINS DE KIWI, pour offrir dans un gommage visage et lèvres, une exfoliation intense et un soin exceptionnel.",
        price: 9.57,
        image: "./public/assets/images/SUCRES DE SOIN GOMMAGE PURIFIANT.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/gommage/sucres-de-soin-gommage-purifiant/OAP6516.html",
        category_id: 6,
        sub_cat_id_1: 12,
        sub_cat_id_2: 14,
        sub_cat_id_3: 15,
        skinId_1: 2,
        skinId_2: 4,
      },

      {
        name: "Revitalift jour",
        description:
          "Le Soin hydratant Jour Revitalift hydrate et raffermit la peau.Il est adapté aux personnes dès 35 ans et jusqu'à 55 ans. Réduit les rides, lisse la surface de la peau, raffermit et renforce la tonicité de la peau",
        price: 8.24,
        image: "./public/assets/images/REVITALIFT JOUR.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/creme-de-jour/revitalift-jour/OAP5218.html",
        category_id: 1,
        sub_cat_id_1: 1,
        sub_cat_id_2: 6,
        skinId_1: 4,
        skinId_2: 5,
      },

      {
        name: "Masque Anti-imperfections Argile Pure",
        description:
          "Les Laboratoires L’Oréal Paris ont sélectionné 3 Argiles Pures et les ont associées à l’extrait d'Algue Marine dans une texture masque-crème ultra fondante et non desséchante pour lutter contre les points noirs et désobstruer les pores, sans déshydrater.",
        price: 9.71,
        image:
          "./public/assets/images/MASQUE ANTI-IMPERFECTIONS ARGILE PURE.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/masque-et-nettoyant/masque-anti-imperfections-argile-pure/OAP6725.html",
        category_id: 5,
        sub_cat_id_1: 15,
        sub_cat_id_2: 10,
        skinId_1: 1,
        skinId_2: 2,
        skinId_3: 4,
      },

      {
        name: "Bright Reveal Fluide Anti-uv Spf50+ Anti-taches Niacinamide",
        description:
          "Les dermatologues recommandent de protéger sa peau au quotidien contre les rayons UV pour une correction optimale des taches. Le Fluide Anti-UV SPS 50+ Anti-Tache Bright Reveal offre une très haute protection contre les UVB et les UVA longs pour prévenir les signes de l’âge et l’apparition des taches. Formulé scientifiquement et concentré en actifs anti-taches.",
        price: 19.99,
        image:
          "./public/assets/images/BRIGHT REVEAL FLUIDE ANTI-UV SPF50+ ANTI-TACHES NIACINAMIDE.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/creme-de-jour/bright-reveal-fluide-anti-uv-spf50--anti-taches-niacinamide/OAP7402.html",
        category_id: 1,
        sub_cat_id_1: 3,
        sub_cat_id_2: 7,
        sub_cat_id_3: 8,
        skinId_1: 8,
      },

      {
        name: "Masque Detox Argile Pure",
        description:
          "Les Laboratoires L’Oréal Paris ont sélectionné 3 Argiles Pures et les ont associées au Charbon dans une texture masque-crème ultra-fondante et non desséchante, pour détoxifier la peau et révéler son éclat, sans la déshydrater.",
        price: 6.74,
        image: "./public/assets/images/Masque Detox Argile Pure.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/masque-et-nettoyant/masque-detox-argile-pure/OAP6532.html",
        category_id: 5,
        sub_cat_id_1: 4,
        sub_cat_id_2: 10,
        sub_cat_id_3: 11,
        skinId_1: 5,
        skinId_2: 4,
        skinId_3: 2,
      },

      {
        name: "Age perfect tonique fraîcheur",
        description:
          "Tonique Fraîcheur Peaux Matures - Enrichi en Vitamine C énergisante et Vitamine B5 - Défroisse et défatigue pour une peau éclatante. Défroisse et défatigue les peaux matures. Nettoie et fortifie la peau. Révèle une peau confortable et fortifiée.",
        price: 4.87,
        image: "./public/assets/images/Age perfect tonique fraîcheur.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/eau-micellaire-et-demaquillant/age-perfect-tonique-fraicheur/OAP3091.html",
        category_id: 7,
        sub_cat_id_1: 2,
        sub_cat_id_2: 3,
        sub_cat_id_3: 4,
        skinId_1: 3,
      },

      {
        name: "Revitalift filler acide hyaluronique yeux",
        description:
          "Le soin Revitalift Filler HA Yeux contient la plus haute concentration d’acide hyaluronique jamais formulée dans un soin yeux l’Oréal Paris.",
        price: 14.24,
        image:
          "./public/assets/images/Revitalift filler acide hyaluronique yeux.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/soin-yeux/revitalift-filler----acide-hyaluronique--yeux/OAP6436.html",
        category_id: 4,
        sub_cat_id_1: 1,
        sub_cat_id_2: 6,
        sub_cat_id_3: 9,
        skinId_1: 2,
        skinId_2: 4,
        skinId_3: 5,
      },

      {
        name: "Revitalift yeux",
        description:
          "Le Soin hydratant Yeux Revitalift agit profondément pour réduire les rides et raffermir la peau. Il est adapté aux personnes dès 35 ans et jusqu'à 55 ans.",
        price: 7.69,
        image: "./public/assets/images/Revitalift yeux.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/soin-yeux/revitalift-yeux/OAP5037.html",
        category_id: 4,
        sub_cat_id_1: 1,
        sub_cat_id_2: 3,
        sub_cat_id_3: 4,
        skinId_1: 4,
        skinId_2: 5,
      },

      {
        name: "Revitalift clinical vitamine C fluide fps 50+",
        description:
          "Les dermatologues recommandent de protéger sa peau au quotidien contre les rayons UV pour prévenir tous les signes de vieillissement. Le Fluide Anti-UV FPS 50+ Revitalift Clinical offre une très haute protection contre les UVB et les UVA longs pour prévenir les signes de l’âge photoinduits : taches, rides et teint irrégulier.",
        price: 14.24,
        image:
          "./public/assets/images/Revitalift clinical vitamine C fluide fps 50+.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/creme-de-jour/revitalift-clinical-vitamine-c-fluide-fps-50-/OAP7231.html",
        category_id: 1,
        sub_cat_id_1: 3,
        skinId_1: 8,
      },

      {
        name: "Revitalift filler gel crème repulpant",
        description:
          "Une ride commence toujours par une ridule. Le nouveau Gel-Crème Repulpant innovant Revitalift Filler comble les ridules et aide à retarder leur apparition. Enrichi en Acide Hyaluronique Micro-Épidermique, 50x plus petit que l’Acide Hyaluronique Macro*, il pénètre plus profondément dans la peau pour repulper les rides et les ridules de l’intérieur",
        price: 18.74,
        image:
          "./public/assets/images/Revitalift filler gel crème repulpant.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/creme-de-jour/revitalift-filler-gel-creme-repulpant/OAP7232.html",
        category_id: 1,
        sub_cat_id_1: 3,
        skinId_1: 8,
      },

      {
        name: "Revitalift filler serum anti-rides 1.5% acide hyaluronique pur",
        description:
          "Le Peeling Exfoliant Anti-Taches Bright Reveal a été formulé pour réduire rapidement les marques post-acné et les taches. Inspiré des peelings professionnels, il contient un puissant mélange d'actifs.",
        price: 14.99,
        image:
          "./public/assets/images/Revitalift filler serum anti-rides 1.5% acide hyaluronique pur.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/serum-et-ampoules-visage/revitalift-filler-serum-anti-rides-1.5--acide-hyaluronique-pur/OAP7043.html",
        category_id: 3,
        sub_cat_id_1: 3,
        skinId_1: 8,
      },

      {
        name: "Revitalift laser x3 creme de jour anti-age triple action",
        description:
          "La Crème de Jour Revitalift Laser X3 revient avec une formule renforcée associant 3 actifs anti-âge de référence. Le Pro-rétinol aide à lisser les rides et à renouveler la texture de la peau. L’Acide Hyaluronique hydrate intensément et repulpe la peau. La Vitamine C1 aide à booster l’éclat de la peau et à unifier visiblement le teint.",
        price: 14.24,
        image:
          "./public/assets/images/Revitalift laser x3 creme de jour anti-age triple action.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/creme-de-jour/revitalift-laser-x3-creme-de-jour-anti-age-triple-action/OAP5412.html",
        category_id: 1,
        sub_cat_id_1: 3,
        sub_cat_id_2: 2,
        sub_cat_id_3: 13,
        skinId_1: 1,
        skinId_2: 2,
      },

      {
        name: "Age perfect renaissance cellulaire midnight serum",
        description:
          "Midnight Serum Age Perfect Renaissance Cellulaire est formulé pour révéler des millions de nouvelles cellules chaque jour, avec sa triple action anti-âge sur les rides, la fermeté et l'éclat . Ce sérum au complexe antioxydant protecteur inspiré de la Science des Cellules Mères permet chaque nuit une haute régénération de la peau, pour un teint éclatant et une peau visiblement plus jeune.",
        price: 14.99,
        image:
          "./public/assets/images/Age perfect renaissance cellulaire midnight serum.jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/serum-et-ampoules-visage/age-perfect-renaissance-cellulaire-midnight-serum/OAP7161.html",
        category_id: 3,
        sub_cat_id_1: 3,
        skinId_1: 8,
      },

      {
        name: "Bright Reveal Peeling Exfoliant Anti-Taches 25% [AHA + BHA + PHA]",
        description:
          "Le Peeling Exfoliant Anti-Taches Bright Reveal a été formulé pour réduire rapidement les marques post-acné et les taches. Inspiré des peelings professionnels, il contient un puissant mélange d'actifs.",
        price: 19.99,
        image:
          "./public/assets/images/Bright Reveal Peeling Exfoliant​ Anti-Taches 25% [AHA + BHA + PHA].jpg",
        product_url:
          "https://www.loreal-paris.fr/soin/soin-par-categorie/gommage/bright-reveal-peeling-exfoliant%E2%80%8B--anti-taches-25---aha-bha-pha-/OAP7401.html",
        category_id: 6,
        sub_cat_id_1: 3,
        sub_cat_id_2: 5,
        sub_cat_id_3: 7,
        skinId_1: 8,
      },
    ];

    // CATEGORY
    const category = [
      "Crème de jour",
      "Soin de nuit",
      "Sérum et ampoules visage",
      "Soin yeux",
      "Masque et nettoyant",
      "Gommage",
      "Eau micellaire et démaquillant",
      "Soin du corps & solaires",
    ];

    // SUB CATEGORY
    const subCategory = [
      "Manque de fermeté et volume",
      "Relâchement cutané",
      "Soin anti-age",
      "Soin anti-fatigue",
      "Soin anti-imperfections",
      "Soin anti-rides",
      "Soin anti-tache",
      "Soin avec Protection",
      "Soin ciblé",
      "Soin Detox",
      "Soin Eclat",
      "Soin Exfoliant",
      "Soin hydratant",
      "Soin Nettoyant",
      "Soin Purifiant",
    ];

    // Insert fake data into the 'user' table

    user.forEach((u) => {
      queries.push(
        database.query(
          "INSERT INTO user (firstname,lastname,email,password,age,city,country,skin_id_1,skin_id_2,skin_id_3) values (?,?,?,?,?,?,?,?,?,?)",
          [
            u.firstname,
            u.lastname,
            u.email,
            u.password,
            u.age,
            u.city,
            u.country,
            u.skin_id_1,
            u.skin_id_2,
            u.skin_id_3,
          ]
        )
      );
    });

    // Insert fake data into the 'skin' table

    skin.forEach((s) => {
      queries.push(database.query("INSERT INTO skin (type) VALUES (?)", [s]));
    });

    // Insert fake data into the 'product' table

    product.forEach((p) => {
      queries.push(
        database.query(
          "INSERT INTO product (name, description, price, image, product_url, category_id, sub_cat_id_1, sub_cat_id_2, sub_cat_id_3, skinId_1, skinId_2, skinId_3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            p.name,
            p.description,
            p.price,
            p.image,
            p.product_url,
            p.category_id,
            p.sub_cat_id_1,
            p.sub_cat_id_2,
            p.sub_cat_id_3,
            p.skinId_1,
            p.skinId_2,
            p.skinId_3,
          ]
        )
      );
    });

    // Insert fake data into the 'category' table

    category.forEach((c) => {
      queries.push(
        database.query("INSERT INTO category (name) VALUES (?)", [c])
      );
    });

    // Insert fake data into the 'sub_category' table

    subCategory.forEach((sc) => {
      queries.push(
        database.query("INSERT INTO sub_category (name) VALUES (?)", [sc])
      );
    });

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
