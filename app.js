const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
require('dotenv').config();
const fileUpload = require('express-fileupload');

// import routes
const authRoute = require('./routes/authRoute');

// app
const app = express();
app.set('view engine', 'ejs');

// middleware
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true
  })
);

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog-site-lxobl.mongodb.net/project_name`,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});

// session config middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    store
  })
);

app.use(flash());

// custom middleware
app.use((req, res, next) => {
  console.log(req.flash('errors'));
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
