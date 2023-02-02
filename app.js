const express = require('express');
const sequelize = require('./database');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');

dotenv.config();

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection Successful');
    app.listen(PORT, () => {
      console.log(`Server is connected on ${PORT}`);
    });
  } catch (err) {
    console.log('Unable to connect:', err);
  }
};

start();
