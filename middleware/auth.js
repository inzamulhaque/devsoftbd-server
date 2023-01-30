const auth = async (req, res, next, ...roles) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    return res.status(403).json({
      status: "fail",
      error: "You are not authorized to access this",
    });
  }

  next();
};

module.exports = auth;
