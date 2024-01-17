const AbstractManager = require("./AbstractManager");

class SubCategoryManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "sub_category" as configuration
    super({ table: "sub_category" });
  }

  // The C of CRUD - Create operation

  async create(subCategory) {
    const { name } = subCategory;
    // Execute the SQL INSERT query to add a new sub_category to the "sub_category" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );

    // Return the ID of the newly inserted sub_category
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific sub_category by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the sub_category
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all sub_categorys from the "sub_category" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of sub_categorys
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing sub_category

  async update(subCategory, id) {
    // Execute the SQL INSERT query to update the row with tie id on the "sub_category" table
    const result = await this.database.query(
      `update ${this.table} set ? where id = ?`,
      [subCategory, id]
    );

    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an sub_category by its ID
  async delete(id) {
    const result = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = SubCategoryManager;
