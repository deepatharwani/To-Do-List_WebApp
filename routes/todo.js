const express = require('express');

const pool = require('../database/db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const todos = await pool.query(
      'SELECT * FROM todo WHERE user_email=$1 ORDER BY id',
      [req.userId]
    );
    res.send(todos.rows);
  } catch (error) {
    res.status(400).send('Something went wrong... Please try later');
  }
});

// ADD
router.post('/', auth, async (req, res) => {
  const { description } = req.body;
  try {
    const addItem = await pool.query(
      'INSERT INTO todo (user_email, description, completed) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, description, false]
    );
    res.status(201).send(addItem.rows[0]);
  } catch (error) {
    res.status(400).send('Failed to add.');
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE from todo WHERE id=$1 and user_email=$2', [
      id,
      req.userId,
    ]);

    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE
router.patch('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  const i = description ? { description } : { completed };
  const key = Object.keys(i)[0];

  try {
    const updatedRow = await pool.query(
      `UPDATE todo SET ${key}='${i[key]}' WHERE user_email=$1 AND id=$2 RETURNING *`,
      [req.userId, id]
    );
    res.send(updatedRow.rows[0]);
  } catch (error) {
    console.log('ERROR IN PATCH', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;

