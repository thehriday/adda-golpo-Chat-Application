const express = require('express');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const passport = require('passport');

// only require part
require('dotenv').config();
require('./passport/passport');

// import routes
const restApiRouter = require('./routes/restApiRouter');
const authRoute = require('./routes/authRoute');
const oAuthRouter = require('./routes/oAuthRouter');
const successMsgRoute = require('./routes/successMsgRoute');
const authUserRoute = require('./routes/authUserRoute');

// controller
const homeController = require('./controllers/homeController');

app.set('view engine', 'ejs');

// parse json from body
app.use(express.json());
// api route
app.use('/api', restApiRouter);

// middleware
app.use(expressLayouts);
app.use(express.static('public'));
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
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    store
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// custom middleware
app.use((req, res, next) => {
  res.locals.title = 'Welcome to Adda Golpo';
  res.locals.isAuth = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// routes

app.get('/test/:text', (req, res) => {
  console.log(req.params.text);
});

// home page
app.get('/', homeController);

// auth router
app.use(authRoute);
// oAuth router
app.use('/oauth', oAuthRouter);
// success message router
app.use(successMsgRoute);
// user route
app.use(authUserRoute);

// error handling middleware
app.use((err, req, res, next) => {
  console.log('server error', err);
  res.status(500).render('error/500', { title: 'Server Error' });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).render('error/404', { title: 'Page Not Found' });
});

// socket.io part
require('./socket.io/receiveMessage')(io);
require('./socket.io/userActiveStatus')(io);

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog-site-lxobl.mongodb.net/project_name`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    http.listen(process.env.PORT, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `App is running on port ${process.env.PORT}`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
