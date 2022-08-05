import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.clientId,
      clientSecret: process.env.clientId,
    }),
  ],
});
