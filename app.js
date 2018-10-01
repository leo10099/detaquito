const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorHandlers = require('./middleware/errorHandlers');
const helpers = require('./helpers');
// ! Iniciar Express
const app = express();
const passport = require('passport');

// ! Cargar modelos

require('./components/admins/Admin');
require('./components/prodeConfig/prodeConfig');
require('./components/users/User');
require('./components/teams/Team');
require('./components/matches/Match');
require('./components/predictions/Prediction');
require('./components/rounds/Round');
require('./components/scores/Score');
require('./components/tourneys/Tourney');

// ! Iniciar y configurar Middleware

// Implementar Pug para tareas de Admin
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Servir achivos estáticos para las páginas de Admin
app.use(express.static(path.join(__dirname, 'public')));

// Pasar variables a Pug
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Implementar Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Iniciar Morgan-Body para loguear las peticiones
const morganBody = require('morgan-body');

morganBody(app);

// Forzar SSL en producción
const enforce = require('express-sslify');
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Implementar Compresión

// Importar Passport config
require('./services/passport');

// Implementar cookies
const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    maxAge: 90 * 24 * 60 * 60 * 1000,
    keys: [`${process.env.COOKIE_KEY}`]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ! Implementar Rutas

// Auth Routes
require('./routes/auth')(app);
// Admin Routes
const AdminRoutes = require('./routes/admin');
// API Routes
const ApiRoutes = require('./routes/api');
// Root
app.use('/', ApiRoutes);
app.use('/', AdminRoutes);

const compression = require('compression');
app.use(compression());

// Usar Handler de errors en desarrollo
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
// Usar Handler de errors en producción
app.use(errorHandlers.productionErrors);

module.exports = app;
