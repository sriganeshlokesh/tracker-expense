const User = require("../models/User");
const fs = require("fs");

// Get User By Id - Middleware
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
