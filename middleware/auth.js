const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'authorization denied' }); // no token
  }
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'invalid token' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('middleware problem');
    res.status(500).json({ msg: 'Server Error' });
  }
};