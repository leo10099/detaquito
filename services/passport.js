const mongoose = require('mongoose');
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const { HeaderAPIKeyStrategy } = require('passport-headerapikey');

const Admin = mongoose.model('Admin');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Implementar Passport OAUTH ( Google & Facebook)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const userMailExists = await User.findOne({
        email: profile.emails[0].value
      });
      if (userMailExists) {
        // el usuario ya se registró con Facebook
        return done(null, userMailExists);
      }
      const userIdExists = await User.findOne({ googleID: profile.id });
      // el usuario existe
      if (userIdExists) {
        return done(null, userIdExists);
      }
      // el usuario no existe, registrarlo
      const userG = await new User({
        email: profile.emails[0].value,
        googleID: profile.id
      }).save();
      done(null, userG);
    }
  )
);

// Implementar Passport Oauth -- Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const userMailExists = await User.findOne({
        email: profile.emails[0].value
      });
      if (userMailExists) {
        // el usuario ya se regristró con Google
        return done(null, userMailExists);
      }
      const userIdExists = await User.findOne({ facebookID: profile.id });
      // el usuario existe
      if (userIdExists) {
        return done(null, userIdExists);
      }
      // el usuario no existe, registrarlo
      const userF = await new User({
        email: profile.emails[0].value,
        facebookID: profile.id
      }).save();
      done(null, userF);
    }
  )
);

// Implementar Passport API-Key Strategy

passport.use(
  new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Api-Key ' },
    false,
    function(apikey, done) {
      Admin.findOne({ apiKey: apikey }, function(err, admin) {
        if (err) {
          return done(err);
        }
        return done(null, admin);
      });
    }
  )
);
