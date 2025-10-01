import { ExtractJwt } from "passport-jwt";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";

// import User from './model/user.js'
const JWTStrategy = passportJWT.Strategy;
dotenv.config();

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-default-secret-key', // Ajouter une clé par défaut
    },
    function (jwtPayload, done) {
      return userModel
        .findOne({ _id: jwtPayload.id })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
