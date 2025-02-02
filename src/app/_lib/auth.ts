import NextAuth from "next-auth";
import authOptions from "@/auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);
