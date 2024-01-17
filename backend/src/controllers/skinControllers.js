// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all skins from the database
    const skins = await tables.skin.readAll();

    // Respond with the skins in JSON format
    res.status(200).json(skins);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific skin from the database based on the provided ID
    const skin = await tables.skin.read(req.params.id);

    // If the skin is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the skin in JSON format
    if (skin == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(skin);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the skin data from the request body
  const skin = req.body;

  try {
    // Insert the skin into the database
    await tables.skin.update(skin, req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the skin data from the request body
  const skin = req.body;

  try {
    // Insert the skin into the database
    const insertId = await tables.skin.create(skin);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted skin
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  // Extract the skin data from the request body
  try {
    // Insert the skin into the database
    await tables.skin.delete(req.params.id);

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
