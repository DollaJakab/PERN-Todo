const { Router } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");

const jwtAuthRouter = Router();

/**
 * * REGISTER
 *   POST /auth/register
 */

jwtAuthRouter.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //* CHECK IF USER EXISTS
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0)
      return res.status(401).send("User already exists.");
    //* HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //* INSERT USER INTO DB
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hash]
    );

    //* GENERATE JWT TOKEN
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json(token);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

/**
 * * LOGIN
 *   POST /auth/login
 */

jwtAuthRouter.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(401).send("Password or Email incorrect");

    //* COMPARE PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword)
      return res.status(401).send("Password or Email incorrect");

    const token = jwtGenerator(user.rows[0].user_id);
    res.json(token);
  } catch (err) {
    console.error(err.message);
  }
});

jwtAuthRouter.get("/verify", authorisation, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

jwtAuthRouter.get("/", authorisation, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = jwtAuthRouter;
