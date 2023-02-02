const express = require('express');
const sequelize = require('./database');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection Successful');
    app.listen(PORT, () => {
      console.log(`Server is connected on ${PORT}`);
    });
  } catch (err) {
    console.log('Unable to connect:', err);
  }
};

start();
