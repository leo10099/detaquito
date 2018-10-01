const passport = require('passport');

module.exports = app => {
  // Login Google OAUTH
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // Login Facebook OAUTH
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // Get User Logged In Info
  app.get('/auth/current', (req, res) => {
    res.send(req.user);
  });

  // Logout

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
