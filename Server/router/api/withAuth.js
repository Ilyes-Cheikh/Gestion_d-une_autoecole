const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = (req, res, next) =>{
  const token = req.headers['x-access-token']
  if (!token) {
    res.send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;