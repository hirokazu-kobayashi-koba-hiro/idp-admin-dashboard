import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const { handlers } = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_AUTH_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_AUTH_AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, trigger, newSession }) {
      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      console.log(session, trigger, newSession);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
});
