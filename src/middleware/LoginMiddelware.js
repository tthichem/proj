const jwt = require('jsonwebtoken');

const isLogin=(req, res, next)=> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ 
    success: false,
    message: 'No token' 
});
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({
        success: false,
         message: 'Invalid token' 
        });
  }
}

module.exports = isLogin;
  

