const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// import routes
const authRoute = require('./routes/authRoute');

// app
const app = express();
app.set('view engine', 'ejs');

// middleware
app.use(expressLayouts);

// session config middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use(flash());

// custom middleware
app.use((req, res, next) => {
  res.locals.title = 'Project Name';
  next();
});

// auth router
app.use(authRoute);

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog-site-lxobl.mongodb.net/project_name`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
