// Import dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize server
const app = express();
const PORT = process.env.PORT || 3001;

// Provide helper functions executable in handlebar files
const hbs = exphbs.create({ helpers });

// Initialize session cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Initialize template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Initialize middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Initialize tables
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on: http://localhost:' + PORT))});