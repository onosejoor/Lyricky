import Google from "next-auth/providers/google";
import { selectUser } from "./userFunctions";
import { createSession } from "./session";
import { supabase } from "./db";

export const authOptions = {
  providers: [
    Google({
      name: "google",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const { email_verified } = profile;
        if (user && email_verified) {
          const select = await selectUser(user.email);
          if (select.data) {
            const { email } = select.data;

            await createSession(email);

            return true;
          } else {
            const { name, email } = user;
            await supabase.from("users").insert({
              email: email,
              password: "google",
              username: name,
            });

            await createSession(email);
            return true;
          }
        }
      } catch (error) {        
        return false;
      }
    },
  },
};
