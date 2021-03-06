// #1
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

// #2
    app.use(passport.initialize());
    app.use(passport.session());

// #3
    passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      User.findOne({
        where: { email }
      })
      .then((user) => {

// #4
        if (!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
// #5
        return done(null, user);
      })
    }));

// #6 put user in the session with User id in session.
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

// #7 when get session info turn into user by finding in DB. puts in req.user.
    passport.deserializeUser((id, callback) => {
      User.findById(id) //findByPk for later version
      .then((user) => {
        callback(null, user);
      })
      .catch((err =>{
        callback(err, user);
      }))

    });
  }
}