const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "category" as configuration
    super({ table: "category" });
  }

  // The C of CRUD - Create operation

  async create(category) {
    const { name } = category;
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );

    // Return the ID of the newly inserted category
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categorys from the "category" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of categorys
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing category

  async update(category, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "category" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [category, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an category by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = CategoryManager;
