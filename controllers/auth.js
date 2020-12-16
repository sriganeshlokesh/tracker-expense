const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

let refreshTokens = [];

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1w" });
};

// Register User
exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already registered";
      return res.status(403).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });

      newUser
        .save()
        .then((user) => {
          user.salt = undefined;
          user.hashed_password = undefined;

          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          // Sign Token
          const accessToken = generateAccessToken(payload);
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: "1w",
          });
          refreshTokens.push(refreshToken);
          res.cookie("token", accessToken);
          // Return user and token to client
          const { _id, name, email } = user;
          return res.json({
            success: true,
            user: { _id, name, email },
            token: `Bearer ${accessToken}`,
            refresh: refreshToken,
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

// Login User
exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find the user by email
  User.findOne({ email }).then((user) => {
    // Check for User
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    } else {
      // Check for Password
      if (!user.authenticate(password)) {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
      // Generate a token for authentication
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken);
      res.cookie("token", accessToken);
      // Return user and token to client
      const { _id, name, email } = user;
      return res.json({
        success: true,
        user: { _id, name, email },
        token: `Bearer ${accessToken}`,
        refresh: refreshToken,
      });
    }
  });
};

// New Token Generation
exports.token = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json({
      errors: "Refresh Token Not Found",
    });
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      errors: "Invalid Refresh Token",
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        errors: err,
      });
    }
    console.log(user);
    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.cookie("token", accessToken);
    const { id, name, email } = user;
    return res.json({
      success: true,
      user: { _id: id, name, email },
      token: `Bearer ${accessToken}`,
    });
  });
};

// Logout User
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout Successful",
  });
};

// Login Check
exports.protect = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// User Authentication
// exports.isAuth = (req, res, next) => {
//   let user = req.profile && req.auth && req.profile._id == req.auth.id;
//   if (!user) {
//     return res.status(403).json({
//       errors: "Access Denied! Unauthorized User",
//     });
//   }
//   next();
// };

// Token Authentication
exports.authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      errors: "Token expired",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        errors: err,
      });
    }
    req.user = user;
    next();
  });
};
