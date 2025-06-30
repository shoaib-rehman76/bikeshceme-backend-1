const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('./config/googleConfig');
const { findOrCreateUser } = require('./services/auth.service');

passport.use(
    new GoogleStrategy(
        {
            clientID: google.clientID,
            clientSecret: google.clientSecret,
            callbackURL: google.callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await findOrCreateUser(profile);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const User = require('./models/user.model');
    User.findById(id, (err, user) => done(err, user));
});
