import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { JWTauthenticate } from "./GenAndVerifyToken.js";
import UsersModel from "../services/users/schema.js";
interface Profile {
  id: string;
  displayName: string;
}

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: `${process.env.CALLBACK_URL}/users/facebookRedirect`,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    passportNext: any
  ) => {
    try {
      console.log("FaceBook:", profile);
      const user = await UsersModel.findOne({ facebookId: profile.id });
      if (user) {
        const token = await JWTauthenticate(user);
        passportNext(null, { token });
      } else {
        const newUser = new UsersModel({
          full_name: profile.displayName,
          facebookId: profile.id,
        });

        // const savedUser = await newUser.save()
        const token = await JWTauthenticate(newUser);
        console.log(token);
        passportNext(null, { token });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
passport.serializeUser(function (data, passportNext) {
  passportNext(null, data);
});
