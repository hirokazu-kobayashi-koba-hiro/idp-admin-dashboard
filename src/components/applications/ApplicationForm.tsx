import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import BasicInfoSection from "@/components/applications/BasicInfoSection";
import AuthSettingsSection from "@/components/applications/AuthSettingsSection";
import UriSettingsSection from "@/components/applications/UriSettingsSection";
import CibaSettingsSection from "@/components/applications/CibaSettingsSection";
import { TabPanels } from "@/components/TabPanels";
import EncryptionSettingsSection from "@/components/applications/EncryptionSettingsSection";
import ScopeSettingsSection from "@/components/applications/ScopeSettingsSection";
import TlsClientAuthSection from "@/components/applications/TlsClientAuthSection";
import SoftwareAndLegalSection from "@/components/applications/SoftwareAndLegalSection";

const initialValues = {
  clientId: "",
  clientIdAlias: "",
  clientName: "",
  clientSecret: "",
  tokenEndpointAuthMethod: "",
  grantTypes: [],
  responseTypes: [],
  redirectUris: [""],
  scope: "",
  clientUri: "",
  logoUri: "",
  tosUri: "",
  policyUri: "",
  softwareId: "",
  softwareVersion: "",
  jwksUri: "",
  jwks: "",
  backchannelTokenDeliveryMode: "",
  backchannelClientNotificationEndpoint: "",
  backchannelAuthenticationRequestSigningAlg: "",
  backchannelUserCodeParameter: false,
  idTokenEncryptedResponseAlg: "",
  idTokenEncryptedResponseEnc: "",
  tlsClientCertificateBoundAccessTokens: false,
  tenantId: "",
  issuer: "",
};

const validationSchema = Yup.object({
  clientIdAlias: Yup.string().required(),
  clientName: Yup.string().required(),
  redirectUris: Yup.array().of(Yup.string().url().required()),
  grantTypes: Yup.array().min(1),
  responseTypes: Yup.array().min(1),
});

export const ApplicationForm = ({
  initialApplication,
}: {
  initialApplication: any;
}) => {
  const elements = [
    {
      label: "Basic",
      node: <BasicInfoSection />,
    },
    {
      label: "Authentication",
      node: <AuthSettingsSection />,
    },
    {
      label: "Uris",
      node: <UriSettingsSection />,
    },
    {
      label: "CIBA",
      node: <CibaSettingsSection />,
    },
    {
      label: "Encryption",
      node: <EncryptionSettingsSection />,
    },
    {
      label: "Scope",
      node: <ScopeSettingsSection />,
    },
    {
      label: "TlsAuth",
      node: <TlsClientAuthSection />,
    },
    {
      label: "Software",
      node: <SoftwareAndLegalSection />,
    },
  ];

  return (
    <Formik
      initialValues={initialApplication}
      onSubmit={(values) => {
        console.log("Submitting", values);
        // Send to backend
      }}
    >
      {() => (
        <Form>
          <TabPanels elements={elements} />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
