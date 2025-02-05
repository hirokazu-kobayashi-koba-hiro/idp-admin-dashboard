import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import {backendUrl} from "@/app/api/backendConfig";
import {convertToCamel} from "@/functions/convertToCamel";

const IdpServer = (options: any) => ({
  ... {
    id: "idp-server",
    name: "IdPServer",
    type: "oidc",
    version: "2.0",
    wellKnown: `${backendUrl}/.well-known/openid-configuration`,
    idToken: false,
    authorization: {
      url: `${backendUrl}/v1/authorizations`,
      params: {
        scope: "openid profile phone email address",
        client_id: process.env.IDP_ADMIN_DASHBOARD_CLIENT_ID,
        response_type: "code",
      }
    },
    checks: ["pkce", "state"],
    token: {
      async request(context: any) {
        const { code } = context.params;
        const params = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: `http://localhost:3000/api/auth/callback/idp-server`,
          client_id: process.env.IDP_ADMIN_DASHBOARD_CLIENT_ID as string
        })
        const response = await fetch(`${backendUrl}/api/v1/tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: params,
        })
        if (!response.ok) {
          console.log(response)
          return {}
        }

        const body = await response.json()
        console.log(body)

        return {
          ...body,
        }
      },
    },
    userinfo: {
      async request(context: any) {
        console.log(context.params);
        const { access_token, refresh_token, expires_at } = context.params;

        const response = await fetch(`${backendUrl}/api/v1/userinfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
          },
        })
        if (!response.ok) {
          console.log(response)
          return {}
        }

        const body = await response.json()
        console.log(body)

        return {
          access_token,
          refresh_token,
          expires_at,
          ...body,
        }
      },
    },
    profile: (profile: any) => {
      const converted = convertToCamel(profile)
      return {
        id: profile.sub,
        ...converted
      }
    }
  },
  ...options,
})

export const { handlers, auth } = NextAuth({
  providers: [
    IdpServer({
      clientId: process.env.IDP_ADMIN_DASHBOARD_CLIENT_ID,
      clientSecret: process.env.IDP_ADMIN_DASHBOARD_CLIENT_SECRET,
      issuer: process.env.IDP_SERVER_ISSUER,
    }),
    Auth0Provider({
      clientId: process.env.NEXT_AUTH_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_AUTH_AUTH0_ISSUER,
    }),
  ],
  // debug: true,
  callbacks: {
    async jwt({ token, account}) {
      if (account) {
        token.accessToken = account.access_token
      }

      return token;
    },
    async session({ session, token, trigger, newSession }) {
      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      console.log(session, trigger, newSession);
      session.user.subscriptionId = "sub_1QmkhOGLT3LvnebjAYzJo1Nf";
      session.user.accessToken = token.accessToken
      return session
    },

  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
});
