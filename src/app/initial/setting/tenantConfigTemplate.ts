export const tenantConfigTemplate = {
    "issuer": "IDP_ISSUER",
    "authorization_endpoint": "IDP_ISSUER/api/debug/v1/authorizations",
    "token_endpoint": "IDP_ISSUER/api/v1/tokens",
    "token_endpoint_auth_methods_supported": [
        "client_secret_post",
        "client_secret_basic",
        "client_secret_jwt",
        "private_key_jwt",
        "tls_client_auth",
        "self_signed_tls_client_auth"
    ],
    "token_endpoint_auth_signing_alg_values_supported": [
        "RS256",
        "ES256"
    ],
    "userinfo_endpoint": "IDP_ISSUER/api/v1/userinfo",
    "jwks_uri": "IDP_ISSUER/api/v1/jwks",
    "jwks": "{\n    \"keys\": [\n        {\n            \"kty\": \"EC\",\n            \"d\": \"yIWDrlhnCy3yL9xLuqZGOBFFq4PWGsCeM7Sc_lfeaQQ\",\n            \"use\": \"sig\",\n            \"crv\": \"P-256\",\n            \"kid\": \"access_token\",\n            \"x\": \"iWJINqt0ySv3kVEvlHbvNkPKY2pPSf1cG1PSx3tRfw0\",\n            \"y\": \"rW1FdfXK5AQcv-Go6Xho0CR5AbLai7Gp9IdLTIXTSIQ\",\n            \"alg\": \"ES256\"\n        }\n,{\n    \"kty\": \"EC\",\n    \"d\": \"HrgT4zqM2BvrlwUWagyeNnZ40nZ7rTY4gYG9k99oGJg\",\n    \"use\": \"enc\",\n    \"crv\": \"P-256\",\n    \"kid\": \"request_enc_key\",\n    \"x\": \"PM6be42POiKdNzRKGeZ1Gia8908XfmSSbS4cwPasWTo\",\n    \"y\": \"wksaan9a4h3L8R1UMmvc9w6rPB_F07IA-VHx7n7Add4\",\n    \"alg\": \"ECDH-ES\"\n},{\n    \"p\": \"3yO0t6JmIHnsW6SrAfHa_4Ynd3unyrTQnCpPCo1GAlzbIRUgyDWohcfKaQ9rFoeO67b91dcpDiH6jTuxdD1S95ph7KB2RuDTGhhD5jg5_VdEthnlK7Hw3GZhFRnsBAKxTmJuJ3R12tcm33054vEtxAZB3FWyVsf0WI36vbDYRU0\",\n    \"kty\": \"RSA\",\n    \"q\": \"n10rboIDPMk0Qyvug--W_s4yB1j7QdIvduBO-bZgrG_rLLXgFTzKbef_ArygXBlCqinwn7MSw6O5G6IKw5raK7IvehlDT_xC8mOtajiFcj_t9PkaUdHXNR-tbJdLJwohbJNwXvP28DhMCTUPLTxW005sVFfChbtFiQ22eJFsrF0\",\n    \"d\": \"azIA2jVLHvXr2jM0Eq9rQCErJqjNjtDu86k0-kmF3xfjuAS9IBuGnU9W0bkuaOaY85ngHEb0qf-nXRnOaF_6s7glSVm0mDM6mNgDOzNmgqHV14mJTkmixAmxrGmvVOix06mIUc2liG_wUO7OHVkd9kgNV5QVj-EF-VDULTin6FfNcJgcUsYAb59_MHASvS8foWNb3o9bSdPFLDDaT0mzl2nwEe8SERtIsLBrcbbKcedQHxm1SUq8sks-1L6E8Qfx6jFQJJMNLj-XBbwrFxww1DwrhmNz_1AOZM5VDTZg-kMDqjcBvgjHzmA2o9X9p1Gaa5xadO51msiZQAbPSMK1sQ\",\n    \"e\": \"AQAB\",\n    \"use\": \"sig\",\n    \"kid\": \"id_token_nextauth\",\n    \"qi\": \"A3s2bGrlaC6WU-vQGvugen8vx4ouqrTY60ZD-E1YRp6ADbC7g6318WZ7IZl-FoFGto--NvnMFOsNYkSMXrFcaroixNjJEo6HcNWs7BTqS7PICZmtmUWr5V2f9RENwJxbG9GnYDsZTQYM84j2PNsJxAzjmFQvQzygsfeEyuzAtJg\",\n    \"dp\": \"vUWmNtWz1vxUdm-49k9WOcRrmbfz3cd949knboXiyoJFBUzMn8aUCdYsZO1FIrkdi-eObGKzWl-MDVyC61xREeGMCpEZgomVxt6qSY-L8M6jY-uXLncjHXBiDOoN_mDiUODBGwp4JYa2XH_2J__3l_zOxLyUJ3Q4WR0lgN2OtUk\",\n    \"alg\": \"RS256\",\n    \"dq\": \"g1bKAJ1uBZ7dT67ZOCsxinZtjNis2qZbL-HVtL-2FOd4LrUGJPqg6suUw7CpiL3Yz10ZTsTK5in82OVHccYhoHmN31cKvtTsZ8_2j-BdOretaYQTSPNkJgghaamW6mnS-iTZK6htD7WWFNCB3YopFKVBapGZY5XfzQBcLinMIpE\",\n    \"n\": \"iuhjEgaY4KCS_rbvODf-QadNvj9DaoHx8PzPKpZdxx_g0aQx7wvachzc7A_F8RKkToM10qGrDtFFehTCzxcC44WHsFezRd3yxNNhdfVEfcHApLpMYaq8A3HAi8NMN-cMkfqQRIvsvDmbYtt8B6EZG8YsFhjMZRY-7gzF_LGdIMoh3Af0WUx-L_AWRIawXuAwDIm11OQh9bt3hdoJbZFd9B4Wf1H5oxbsJ5MZQAQ9ltc23F60zqoDt5RAehC30w7rMeYH8WKoKpS5-odhVUDqieAS5j8iVegjcl63CoxS2BRLmN9UYzQvuEo-HUeWbucBlXmqD4sdn6Ypyt5QZpzo-Q\"\n}]\n}",
    "grant_types_supported": [
        "authorization_code",
        "refresh_token",
        "password",
        "client_credentials",
        "urn:openid:params:grant-type:ciba"
    ],
    "scopes_supported": [
        "openid",
        "profile",
        "email",
        "address",
        "phone",
        "offline_access",
        "account",
        "transfers",
        "read",
        "write"
    ],
    "response_types_supported": [
        "code",
        "token",
        "id_token",
        "code token",
        "code token id_token",
        "token id_token",
        "code id_token",
        "none",
        "vp_token",
        "vp_token id_token"
    ],
    "acr_values_supported": [
        "urn:mace:incommon:iap:silver",
        "urn:mace:incommon:iap:bronze"
    ],
    "subject_types_supported": [
        "public",
        "pairwise"
    ],
    "userinfo_signing_alg_values_supported": [
        "RS256",
        "ES256",
        "HS256"
    ],
    "userinfo_encryption_alg_values_supported": [
        "RSA1_5",
        "A128KW"
    ],
    "userinfo_encryption_enc_values_supported": [
        "A128CBC-HS256",
        "A128GCM"
    ],
    "id_token_signing_alg_values_supported": [
        "RS256",
        "ES256",
        "HS256"
    ],
    "id_token_encryption_alg_values_supported": [
        "RSA1_5",
        "A128KW"
    ],
    "id_token_encryption_enc_values_supported": [
        "A128CBC-HS256",
        "A128GCM"
    ],
    "request_object_signing_alg_values_supported": [
        "none",
        "RS256",
        "ES256"
    ],
    "display_values_supported": [
        "page",
        "popup"
    ],
    "claim_types_supported": [
        "normal",
        "distributed"
    ],
    "claims_supported": [
        "sub",
        "iss",
        "auth_time",
        "acr",
        "name",
        "given_name",
        "family_name",
        "nickname",
        "profile",
        "picture",
        "website",
        "email",
        "email_verified",
        "locale",
        "zoneinfo",
        "birthdate",
        "gender",
        "preferred_username",
        "middle_name",
        "updated_at",
        "address",
        "phone_number",
        "phone_number_verified"
    ],
    "claims_parameter_supported": true,
    "service_documentation": "http://server.example.com/connect/service_documentation.html",
    "ui_locales_supported": [
        "en-US",
        "en-GB",
        "en-CA",
        "fr-FR",
        "fr-CA"
    ],
    "token_introspection_endpoint": "IDP_ISSUER/api/v1/tokens/introspection",
    "token_revocation_endpoint": "IDP_ISSUER/api/v1/tokens/revocation",
    "backchannel_token_delivery_modes_supported": [
        "poll",
        "ping",
        "push"
    ],
    "backchannel_authentication_endpoint": "IDP_ISSUER/api/v1/backchannel/authentications",
    "backchannel_authentication_request_signing_alg_values_supported": [
        "RS256",
        "ES256"
    ],
    "backchannel_user_code_parameter_supported": true,
    "authorization_details_types_supported":[
        "payment_initiation",
        "account_information",
        "openid_credential"
    ],
    "authorization_signing_alg_values_supported": [
        "RS256",
        "ES256",
        "HS256"
    ],
    "authorization_encryption_alg_values_supported": [
        "RSA1_5",
        "A128KW"
    ],
    "authorization_encryption_enc_values_supported": [
        "A128CBC-HS256",
        "A128GCM"
    ],
    "tls_client_certificate_bound_access_tokens": true,
    "vp_formats_supported": {
        "jwt_vc_json": {
            "alg_values_supported": [
                "ES256K",
                "ES384"
            ]
        },
        "jwt_vp_json": {
            "alg_values_supported": [
                "ES256K",
                "EdDSA"
            ]
        }
    },
    "token_signed_key_id": "id_token_nextauth",
    "id_token_signed_key_id": "id_token_nextauth",
    "access_token_duration": 3600,
    "id_token_duration": 3600,
    "id_token_strict_mode": true,
    "default_max_age": 86400,
    "fapi_baseline_scopes" : [
        "read"
    ],
    "fapi_advance_scopes" : [
        "write"
    ]
}