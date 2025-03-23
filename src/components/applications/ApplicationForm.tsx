import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import BasicInfoSection from "@/components/applications/BasicInfoSection";
import AuthSettingsSection from "@/components/applications/AuthSettingsSection";
import UriSettingsSection from "@/components/applications/UriSettingsSection";
import CibaSettingsSection from "@/components/applications/CibaSettingsSection";
import { TabPanels } from "@/components/ui/TabPanels";
import EncryptionSettingsSection from "@/components/applications/EncryptionSettingsSection";
import ScopeSettingsSection from "@/components/applications/ScopeSettingsSection";
import TlsClientAuthSection from "@/components/applications/TlsClientAuthSection";
import SoftwareAndLegalSection from "@/components/applications/SoftwareAndLegalSection";
import { convertToSnake } from "@/functions/convertToSnake";
import {useApplications} from "@/hooks/useApplications";
import {systemAlertAtom} from "@/state/SystemState";
import {useAtom} from "jotai";
import {useRouter} from "next/navigation";

export const initialValues = {
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

export const validationSchema = Yup.object({
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
  const { putApplication } = useApplications()
  const [, setSystemAlert] = useAtom(systemAlertAtom);
  const router = useRouter();


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
      onSubmit={async (values) => {// Send to backend
        const { payload, error} = await putApplication(initialApplication.clientId, values)

        if (!payload && error) {
          setSystemAlert({
            open: true,
            title: error?.type || "error",
            body: error?.description || "unexpected error",
            onClickPositiveButton: () => {
              console.log("onClickPositiveButton");
            },
            onClickNegativeButton: () => {
              console.log("onClickNegativeButton");
            },
          })
          return
        }

        router.push("/applications")
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
