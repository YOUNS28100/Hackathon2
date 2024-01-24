// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all sub_categorys from the database
    const subCategorys = await tables.sub_category.readAll();

    // Respond with the sub_categorys in JSON format
    res.status(200).json(subCategorys);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific sub_category from the database based on the provided ID
    const subCategory = await tables.sub_category.read(req.params.id);

    // If the sub_category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the sub_category in JSON format
    if (subCategory == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(subCategory);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the sub_category data from the request body
  const subCategory = req.body;

  try {
    // Insert the sub_category into the database
    await tables.sub_category.update(subCategory, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the sub_category data from the request body
  const subCategory = req.body;

  try {
    // Insert the sub_category into the database
    const insertId = await tables.sub_category.create(subCategory);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted sub_category
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the sub_category data from the request body
  try {
    // Insert the sub_category into the database
    await tables.sub_category.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
