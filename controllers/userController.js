const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Json } = require('sequelize/types/utils');
const User = require('../models/userModel');

const signUp = (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: bcrypt.hash(password, 10),
    };

    const user = User.create(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('user', JSON.stringify(user, null, 2));
      console.log(token);
      return res.status(201).json(user);
    } else {
      return res.status(409).json('Details are not correct');
    }
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ where: { email: email } });

    if (user) {
      const isSame = bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('user', JSON.stringify(user, null, 2));
        console.log(token);
        return res.status(201).json(user);
      } else {
        return res.status(401).json({ message: 'Authentication failed' });
      }
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signUp, login };
