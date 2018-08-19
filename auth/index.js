const localStrategy = require('passport-local').Strategy;
const userModel = require('../db/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = passport => {
  // Setup `signup` authentication middleware.
  // When called this will attempt to save the new user in the database.
  // If successful, the pass result on to the next step.
  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          // Save the information provided by the user to the the database
          const result = await userModel.save(email, password);
          //Send the user information to the next middleware
          return done(null, result.user, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // Setup `login` authentication middleware.
  // When called the provided email is sent to the database.
  // If a result is found, the passwords are checked.
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          const result = await userModel.find(email);

          if (!result.success) {
            //If the user isn't found in the database, return a message
            return done(null, false, result);
          }

          //Validate password and make sure it matches with the corresponding hash stored in the database
          //If the passwords match, it returns a value of true.
          const validate = await userModel.isValidPassword(user, password);
          if (!validate) {
            return done(null, false, {
              success: false,
              email,
              message: 'Wrong Password'
            });
          }
          //Send the user information to the next middleware
          return done(null, result.user, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Makes information regarding the JWT available to the next step.
  passport.use(
    new JWTstrategy(
      {
        //secret we used to sign our JWT
        secretOrKey: 'top_secret',
        // Extracts JWT from `authentication` header with schema bearer
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          // Pass the user details to the next middleware
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
