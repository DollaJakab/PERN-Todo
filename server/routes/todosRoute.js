const express = require("express");
const pool = require("../db.js");
const authorisation = require("../middleware/authorisation.js");

const todosRouter = express.Router();
todosRouter.use(authorisation);

/**
 * * CREATE TODO
 *   POST /todos
 */

todosRouter.post("/", async (req, res) => {
  try {
    const id = req.user;
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, user_id ) VALUES($1, $2) RETURNING * ",
      [description, id]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

/**
 * * GET ALL TODOS
 *   GET /todos
 * */

todosRouter.get("/", async (req, res) => {
  try {
    const id = req.user;
    const allTodos = await pool.query("SELECT * FROM todo WHERE user_id = $1", [
      id,
    ]);
    res.json(allTodos.rows);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * * GET A TODO
 *   GET /todos/:id
 * */

todosRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * * UPDATE A TODO
 *   PUT /todos/:id
 * */

todosRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING * ",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * * DELETE A TODO
 *   DELETE /todos/:id
 */

todosRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removeTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );
    res.json(removeTodo.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = todosRouter;
