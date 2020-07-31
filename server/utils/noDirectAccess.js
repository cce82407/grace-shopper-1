const noDirectAccess = (req, res, next) => {
  if (!req.headers.referer) {
    res.sendStatus(401);
  } else {
    next();
  }
}

module.exports = noDirectAccess;