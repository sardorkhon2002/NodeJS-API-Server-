const User = require('../models/userModel');

const saveUser = (req, res, next) => {
  try {
    const username = User.findOne({ where: { userName: req.body.userName } });

    if (username) {
      return res
        .status(409)
        .json({ message: 'Similar Username already exists' });
    }

    const emailCheck = User.findOne({ where: { email: req.body.email } });

    if (emailCheck) {
      return res.status(409).json({ message: 'Authentication failed' });
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = saveUser;
