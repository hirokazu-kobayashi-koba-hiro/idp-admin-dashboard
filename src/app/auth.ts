import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { convertToCamel } from "@/functions/convertToCamel";
import { decodeJwt } from "@/functions/oauth";

export const issuer = process.env.NEXT_PUBLIC_IDP_SERVER_ISSUER;
export const backendUrl = process.env.NEXT_PUBLIC_IDP_SERVER_BACKEND_URL;
export const frontendUrl = process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_URL;

const IdpServer = (options: any) => ({
  ...{
    id: "idp-server",
    name: "IdPServer",
    type: "oidc",
    version: "2.0",
    wellKnown: `${issuer}/.well-known/openid-configuration`,
    idToken: false,
    authorization: {
      url: `${issuer}/api/v1/authorizations`,
      params: {
        scope: "openid profile phone email address",
        client_id: process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID,
        response_type: "code",
      },
    },
    checks: ["pkce", "state"],
    token: {
      async request(context: any) {
        console.log("------------- token request -----------------");
        const { code } = context.params;
        const params = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: `${frontendUrl}/api/auth/callback/idp-server`,
          client_id: process.env
            .NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID as string,
        });
        const response = await fetch(`${issuer}/api/v1/tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        });
        if (!response.ok) {
          console.log(response);
          return {};
        }

        const body = await response.json();
        console.log("token", body);

        return {
          ...body,
        };
      },
    },
    userinfo: {
      async request(context: any) {
        console.log(context.params);
        const { access_token, refresh_token, expires_at, id_token } =
          context.params;

        const response = await fetch(`${issuer}/api/v1/userinfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (!response.ok) {
          console.log(response);
          return {};
        }

        const body = await response.json();
        console.log("userinfo", body);

        return {
          access_token,
          refresh_token,
          id_token,
          expires_at,
          ...body,
        };
      },
    },
    profile: (profile: any) => {
      const converted = convertToCamel(profile);
      return {
        id: profile.sub,
        ...converted,
      };
    },
  },
  ...options,
});

export const { handlers, auth } = NextAuth({
  providers: [
    IdpServer({
      clientId: process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID,
      clientSecret: process.env.NEXT_IDP_ADMIN_DASHBOARD_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_IDP_SERVER_ISSUER,
    }),
    Auth0Provider({
      clientId: process.env.NEXT_AUTH_AUTH0_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_AUTH0_CLIENT_SECRET,
      issuer: process.env.NEXT_AUTH_AUTH0_ISSUER,
    }),
  ],
  // debug: true,
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      console.log("--------------- jwt ----------------");
      console.log(token);
      console.log(account);
      console.log(trigger);
      console.log(session);
      if (account) {
        token.accessToken = account.access_token;
      }

      //FIXME consider logic
      if (account?.id_token) {
        const decodedIdToken = decodeJwt(account.id_token);
        if (decodedIdToken) {
          const { payload } = decodedIdToken;
          token.tenantId =
            payload.organization?.assigned_tenants?.length > 0
              ? payload.organization.assigned_tenants[0].id
              : undefined;
          token.organizationId = payload.organization?.id;
        }
      }

      if (trigger === "update") {
        console.log("--------------- update jwt ----------------");
        token.tenantId = session?.tenantId;
        token.organizationId = session?.organizationId;
      }

      return token;
    },
    async session({ session, token, trigger, newSession }) {
      console.log("------------- session -----------------");
      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      console.log(session, token, trigger, newSession);
      if (trigger === "update") {
        console.log("--------------- update session ----------------");
        session.tenantId = newSession?.tenantId;
        session.organizationId = newSession?.organizationId;
      } else {
        session.user.subscriptionId = "sub_1QmkhOGLT3LvnebjAYzJo1Nf";
        session.user.customerId = "cus_RgYcKnMlSxoaHs";
        session.accessToken = token.accessToken;
        session.tenantId = token.tenantId;
        session.organizationId = token.organizationId;
      }
      return session;
    },
  },
  events: {
    async signOut() {
      console.log("------------- signOut -----------------");
      const logoutUrl = new URL("https://your-idp.com/logout");
      logoutUrl.searchParams.set("id_token_hint", "token.idToken");
      logoutUrl.searchParams.set(
        "post_logout_redirect_uri",
        "https://your-rp.com/",
      );

      await fetch(
        `${issuer}/v1/logout?client_id=${process.env.NEXT_PUBLIC_IDP_ADMIN_DASHBOARD_CLIENT_ID}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
});
