import { Card, CardContent, Grid } from "@mui/material";
import { LabeledTypography } from "@/components/LabeledTypography";

export const ApplicationBasic = (props: any) => {
  const { application } = props;

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"issuer"} value={application.issuer} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"clientId"}
                value={application.clientId}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"clientSecret"}
                value={application.clientSecret}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"clientIdIssuedAt"}
                value={application.clientIdIssuedAt}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"clientSecretExpiresAt"}
                value={application.clientSecretExpiresAt}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"clientName"}
                value={application.clientName}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"tokenEndpointAuthMethod"}
                value={application.tokenEndpointAuthMethod}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"redirectUris"}
                value={application.redirectUris?.join(", ") || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"responseTypes"}
                value={application.responseTypes?.join(", ") || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"grantTypes"}
                value={application.grantTypes?.join(", ") || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"scope"} value={application.scope} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"logoUri"}
                value={application.logoUri || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"backchannelTokenDeliveryMode"}
                value={application.backchannelTokenDeliveryMode || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"applicationType"}
                value={application.applicationType || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"authorizationDetailsTypes"}
                value={application.authorizationDetailsTypes?.join(", ") || ""}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
