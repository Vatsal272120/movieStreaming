const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const Auth = require('./routes/Auth');

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(Auth);

// database connection and server is running on port
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log('listening on port' + process.env.PORT + 'and db connected');
    })
  )
  .catch((err) => {
    console.error(err);
  });
