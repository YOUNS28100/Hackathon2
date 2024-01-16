// Import access to database tables
const client = require("../../database/client");
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const items = await tables.item.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.item.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const item = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.item.create(item);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const getColor = (req, res) => {
  client
    .query("select * from color")
    .then(([color]) => {
      // Envoyer la liste des films en tant que réponse JSON
      res.json(color);
    })
    .catch((err) => {
      // En cas d'erreur, logguer l'erreur et envoyer une réponse avec le code d'erreur 500 (Internal Server Error)
      console.error(err);
      res.sendStatus(500);
    });
};

const getColorById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Utiliser la méthode query de la base de données pour exécuter une requête SQL SELECT avec une clause WHERE

  client
    .query("select * from color where id = ?", [id])
    .then((color) => {
      if (color != null) {
        // Si trouvé, envoyer le premier film trouvé en tant que réponse JSON
        res.json(color[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      // En cas d'erreur, logguer l'erreur et envoyer une réponse avec le code d'erreur 500 (Internal Server Error)
      console.error(err);
      res.sendStatus(500);
    });
};

const postColor = (req, res) => {
  const { firstname, lastname } = req.body;
  client
    .query("INSERT INTO color(firstname, lastname) VALUES (?, ?)", [
      firstname,
      lastname,
    ])
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateColor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstname, lastname } = req.body;
  client
    .query("update color set firstname = ?, lastname = ? WHERE id = ?", [
      firstname,
      lastname,
      id,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteColor = (req, res) => {
  const id = parseInt(req.params.id, 10);

  client
    .query("delete from color where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// Ready to export the controller functions
module.exports = {
  getColor,
  postColor,
  updateColor,
  getColorById,
  deleteColor,
  browse,
  read,
  // edit,
  add,
  // destroy,
};
