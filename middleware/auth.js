const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(401).json({ error: 'No JWT provided' });
  } else {
    try {
      const token = authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = user.userId;
    } catch (error) {
      console.log('ERROR: ', error.message);
      res.status(401).json({ error: error.message });
    }

    next();
  }
};

module.exports = auth;


