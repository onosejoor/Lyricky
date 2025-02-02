import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { selectUser } from "./app/_lib/actions";
import { createSession } from "./app/_lib/session";
import User from "./lib/models/user.model";

export default {
  providers: [
    Google({
      name: "google",
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      try {
        if (user && profile?.email_verified) {
          const select = await selectUser(user.email || "");
          if (select.data) {
            const { id } = select.data;

            await createSession(id);

            return true;
          } else {
            const { name, email, image } = user;
            const newUser = new User({
              email: email,
              password: process.env.GOOGLE_CODE!,
              username: name,
              avatar: image,
            });
            await newUser.save();

            const insertedUser = await User.findOne({ email: email });
            console.log(insertedUser);

            await createSession(insertedUser?.id!);
            return true;
          }
        }
        return false;
      } catch (error) {
        return false;
      }
    },
  },
} satisfies NextAuthConfig;
