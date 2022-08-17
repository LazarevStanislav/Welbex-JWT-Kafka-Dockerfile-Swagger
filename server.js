require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET,
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: null,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.userName = req.session?.userName;
  next();
});

app.listen(PORT, () => {
  console.log(`server started PORT: http://localhost:${PORT}`);
});
