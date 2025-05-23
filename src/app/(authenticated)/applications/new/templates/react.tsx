export const ReactTemplate = {
  issuer: "$ISSUER",
  client_id: "$CLIENT_ID",
  client_secret: "$CLIENT_SECRET",
  redirect_uris: [
    "http://localhost:3000/api/auth/callback/idp-server",
    "http://localhost:4000/api/auth/callback/idp-server",
  ],
  response_types: [
    "code",
    "token",
    "id_token",
    "code token",
    "code token id_token",
    "token id_token",
    "code id_token",
    "none"
  ],
  grant_types: [
    "authorization_code",
    "refresh_token",
    "password",
    "client_credentials",
    "urn:openid:params:grant-type:ciba",
  ],
  scope:
    "openid profile email address phone offline_access account transfers read write",
  client_name: "React app",
  "client_name#ja-Jpan-JP": "React app",
  token_endpoint_auth_method: "client_secret_basic",
  logo_uri: "https://client.example.org/logo.png",
  jwks_uri: "https://client.example.org/my_public_keys.jwks",
  backchannel_token_delivery_mode: "ping",
  backchannel_client_notification_endpoint:
    "https://client.example.org/ciba/callback",
  backchannel_authentication_request_signing_alg: "ES256",
  backchannel_user_code_parameter: true,
  application_type: "web",
  authorization_details_types: [
    "payment_initiation",
    "account_information",
    "openid_credential",
  ],
};
