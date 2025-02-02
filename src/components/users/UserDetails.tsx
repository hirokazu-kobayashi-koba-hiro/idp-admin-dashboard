import { Card, CardContent, Grid } from "@mui/material";
import { User } from "@/app/api/admin/users/route";
import { LabeledTypography } from "@/components/LabeledTypography";

type UserDetailsProps = {
  user: User;
};

export const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"id"} value={user.sub} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"name"} value={user.name} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"email"} value={user.email} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"givenName"}
                value={user.givenName || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"familyName"}
                value={user.familyName || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"middleName"}
                value={user.middleName || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"nickname"}
                value={user.nickname || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"preferredUsername"}
                value={user.preferredUsername || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"profile"} value={user.profile || ""} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"picture"} value={user.picture || ""} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"website"} value={user.website || ""} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"gender"} value={user.gender || ""} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"birthdate"}
                value={user.birthdate || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"zoneinfo"}
                value={user.zoneinfo || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography label={"locale"} value={user.locale || ""} />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabeledTypography
                label={"phoneNumber"}
                value={user.phoneNumber || ""}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
