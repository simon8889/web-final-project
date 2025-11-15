const authenticateUser = (req, res, next) => {
  const userId = req.headers['user-id'];
  
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'No autenticado'
    });
  }

  req.userId = parseInt(userId);
  next();
};

module.exports = { authenticateUser };
