const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
      if (roles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    };
  };
  
  module.exports = roleMiddleware;
  