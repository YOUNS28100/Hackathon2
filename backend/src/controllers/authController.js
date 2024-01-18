const argon2 = require("argon2");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await tables.user.readByEmail(email);

    if (user == null) {
      res.status(404).json({
        message: "Combination e-mail / password is invalid",
      });
      return;
    }

    const verified = await argon2.verify(user.password, password);

    const userVerified = {
      id: user.id,
      email: user.email,
    };

    if (!verified) {
      res.status(403).json({
        message: " e-mail / password is invalid",
      });
    } else {
      res.status(200).json(userVerified);
    }
  } catch (error) {
    console.error("Error in login:", error);
    next(error);
  }
};

module.exports = { login };
