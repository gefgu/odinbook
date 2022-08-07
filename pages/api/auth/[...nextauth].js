import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "../../../lib/mongodb";

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
  ],
  debug: false,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
});
