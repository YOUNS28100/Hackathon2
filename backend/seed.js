/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)

    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "insert into user (firstname, lastname, email, password, city, coord_x, coord_y, age, skin_id_1, skin_id_2, skin_id_3) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.internet.password(),
            faker.location.city(),
            faker.location.latitude(),
            faker.location.longitude(1),
            faker.number.int({ min: 1, max: 3 }),
            faker.number.int({ min: 1, max: 3 }),
            faker.number.int({ min: 1, max: 3 }),
            faker.number.int({ min: 1, max: 3 }),
          ]
        )
      );
    }

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
