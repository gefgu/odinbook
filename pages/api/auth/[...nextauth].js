import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      profile(profile) {
        return {
          name: profile.name,
          image: profile.picture.data.url,
          friends: [],
          friendshipRequests: [],
          id: profile.id,
          email: profile.email,
          facebookId: profile.id,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your name" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        return null;
      },
    }),
  ],
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    newUser: "/dashboard",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
});
