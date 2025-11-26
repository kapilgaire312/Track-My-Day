import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { validateSignupInfo } from "./app/api/user/utils";
import dbConnect from "./lib/services/mongodb";
import User from "./lib/models/user-model";
import bcrypt from 'bcrypt'

export const { handlers, signIn, signOut, auth } = NextAuth(
  {
    providers: [
      Credentials({
        credentials: {
          email: {
            type: "text",
            label: "email"

          },
          password: {
            type: "password",
            label: "password"
          }
        },
        authorize: async (credentials) => {
          try {

            console.log(credentials)

            validateSignupInfo(credentials);

            await dbConnect();
            const userDb = await User.findOne({ email: credentials.email });

            if (!userDb) {
              throw new Error('User with that email not found.')
            }
            if (userDb.isNotVerified) {

              const now = new Date();
              const diff = now - userDb.verificationSentAt  //gives the difference in milliseconds between the two dates.
              console.log(diff)
              if (diff > 24 * 60 * 60 * 1000 || isNaN(diff)) {
                try {
                  await sendVerificationMail(userDb.email)
                  userDb.verificationSentAt = now;
                  await userDb.save()
                } catch (error) {
                  throw new Error('User not verified. Error sending verification email.')
                }
              }

              throw new Error('User is not verified. Check your inbox.')

            }

            const isMatch = await bcrypt.compare(credentials.password, userDb.password)
            console.log(isMatch)
            if (!isMatch) {
              throw new CredentialsSignin("Email and password don't match");
            }
            console.log(userDb._id.toString())
            console.log(userDb._id)
            const userId = userDb._id.toString()
            //  return userDb  don't directly return the object fetched prom the db only return the necessary things.
            return ({
              email: userId, //sending userId disguised as email to get to client without using callbacks.
              //id : userId didn`t received on client , need to use callbacks for this. 
            })


          } catch (error) {
            //   return null
            console.log(error.message)
            throw new Error("error ocuured ma guy")

          }
        }
      })

    ],
    // callbacks: {
    //   async jwt({ token, user }) {
    //     // This runs when JWT is created/updated
    //     if (user) {
    //       token.id = user.id;  // store id in JWT
    //     }
    //     return token;
    //   },
    //   async session({ session, token }) {
    //     // This runs when session is returned to client
    //     session.user.id = token.id;  // copy id from JWT to session
    //     return session;
    //   }
    // }
  }
)