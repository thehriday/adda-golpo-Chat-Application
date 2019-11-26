const jsw = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1];
    const decode = jsw.verify(token, process.env.SECRET_CODE);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authentication failed' });
  }
};
