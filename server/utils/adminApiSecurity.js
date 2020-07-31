const adminApiSecurityCheck = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    res.sendStatus(401);
  } else {
    next();
  }
}

module.exports = adminApiSecurityCheck;