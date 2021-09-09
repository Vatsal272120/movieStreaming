const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const Auth = require('./routes/Auth');
const Users = require('./routes/Users');
const Movies = require('./routes/Movies');
const Lists = require( './routes/Lists' );

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

/*  ROUTES */

// Register and Login with JWT Authentication
app.use(Auth);

// User CRUD Operations
app.use(Users);

// Movie CRUD Operations
app.use(Movies);

// Movie lists CRUD operations
app.use(Lists);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO, {
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
