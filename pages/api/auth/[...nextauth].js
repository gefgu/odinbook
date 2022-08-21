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
      async authorize(credentials, req) {
        const data = { name: req.body.name, email: req.body.email };

        const JSONdata = JSON.stringify(data);

        const endpoint = `${req.headers.origin}/api/users`;

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSONdata,
        };
        const response = await fetch(endpoint, options);
        const { user } = await response.json();

        return user;
      },
    }),
  ],
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
        session.user.id = token.sub  || token.uid;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user._id;
      }

      return token;
    },
  },
});
