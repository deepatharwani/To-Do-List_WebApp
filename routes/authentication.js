var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();

const pool = require('../database/db');
const { createAccessToken } = require('../utils/token');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(403).send('User id or password incorrect.');
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isCorrectPassword) {
      return res.status(400).send('User id or password incorrect.');
    }

    const accessToken = createAccessToken(email);
    res.send({
      accessToken,
      email,
      name: user.rows[0].name,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/register', async function(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await pool.query('SELECT email from users WHERE email=$1', [
      email,
    ]);

    if (user.rowCount > 0) {
      return res.status(400).send('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashPassword]
    );

    const accessToken = createAccessToken(email);
    const newUserObj = { name, email, accessToken };

    res.status(201).json(newUserObj);
  } catch (error) {
    res.status(500).send(error.message);
  }
  
});

module.exports = router;


