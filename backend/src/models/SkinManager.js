const AbstractManager = require("./AbstractManager");

class SkinManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "skin" as configuration
    super({ table: "skin" });
  }

  // The C of CRUD - Create operation

  async create(skin) {
    const { type } = skin;
    // Execute the SQL INSERT query to add a new skin to the "skin" table
    const [result] = await this.database.query(
      `insert into ${this.table} (type) values (?)`,
      [type]
    );

    // Return the ID of the newly inserted skin
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific skin by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the skin
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all skins from the "skin" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of skins
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing skin

  async update(skin, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "skin" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [skin, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an skin by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = SkinManager;
