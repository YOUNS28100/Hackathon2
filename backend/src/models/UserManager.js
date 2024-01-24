const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const {
      firstname,
      lastname,
      email,
      hashedPassword,
      city,
      country,
      longitude,
      latitude,
      age,
      skinType1,
      skinType2,
      skinType3,
    } = user;

    let newSkin2 = skinType2;
    let newSkin3 = skinType3;

    if (skinType2 === "") {
      newSkin2 = 8;
    }

    if (skinType3 === "") {
      newSkin3 = 8;
    }

    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password, city, country, latitude, longitude, age, skin_id_1, skin_id_2, skin_id_3) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        firstname,
        lastname,
        email,
        hashedPassword,
        city,
        country,
        latitude,
        longitude,
        Number(age),
        skinType1,
        newSkin2,
        newSkin3,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select user.*, skin_1.type AS skin_type_1, skin_2.type AS skin_type_2, skin_3.type AS skin_type_3 from ${this.table} LEFT JOIN skin AS skin_1 ON ${this.table}.skin_id_1=skin_1.id LEFT JOIN skin AS skin_2 ON ${this.table}.skin_id_2=skin_2.id LEFT JOIN skin AS skin_3 ON ${this.table}.skin_id_3=skin_3.id where ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select user.firstname, user.lastname, user.email, user.password, user.city, user.country, user.latitude, user.longitude, user.age, skin_1.type AS skin_type_1, skin_2.type AS skin_type_2, skin_3.type AS skin_type_3 from ${this.table} LEFT JOIN skin AS skin_1 ON ${this.table}.skin_id_1=skin_1.id LEFT JOIN skin AS skin_2 ON ${this.table}.skin_id_2=skin_2.id LEFT JOIN skin AS skin_3 ON ${this.table}.skin_id_3=skin_3.id`
    );

    // Return the array of users AS
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  async update(user, id) {
    const {
      firstname,
      lastname,
      email,
      password,
      city,
      country,
      longitude,
      latitude,
      age,
      skinType1,
      skinType2,
      skinType3,
    } = user;

    let newSkin2 = skinType2;
    let newSkin3 = skinType3;

    if (skinType2 === "") {
      newSkin2 = 8;
    }

    if (skinType3 === "") {
      newSkin3 = 8;
    }
    // Execute the SQL INSERT query to update the row with tie id on the "user" table
    const result = await this.database.query(
      `update ${this.table} set  firstname=?, lastname=?, email=?, password=?, city=?, country=?, longitude=?, latitude=?, age=?,  skin_id_1=?,  skin_id_2=?,  skin_id_3=? where id = ?`,
      [
        firstname,
        lastname,
        email,
        password,
        city,
        country,
        longitude,
        latitude,
        age,
        skinType1,
        newSkin2,
        newSkin3,
        id,
      ]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }

  // AUTHENTIFICATION

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT id, email, password FROM ${this.table} WHERE email=?`,
      [email]
    );

    return rows[0];
  }
}

module.exports = UserManager;
