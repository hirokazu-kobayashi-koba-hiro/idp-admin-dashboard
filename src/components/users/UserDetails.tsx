import { Grid } from "@mui/material";
import { SettingCardGrid } from "@/components/ui/SettingCardGrid";
import { FormField } from "@/components/ui/FormField";


export const UserDetails = () => {

  return (
    <>
      <SettingCardGrid title={"detail"}>
        <Grid container spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField label={"sub"} name={"sub"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"name"} name={"name"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"email"} name={"email"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"givenName"} name={"givenName"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"familyName"} name={"familyName"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"middleName"} name={"middleName"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"nickname"} name={"nickname"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label={"preferredUsername"}
                name={"preferredUsername"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"profile"} name={"profile"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"picture"} name={"picture"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"website"} name={"website"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"gender"} name={"gender"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"birthdate"} name={"birthdate"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"zoneinfo"} name={"zoneinfo"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"locale"} name={"locale"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField label={"phoneNumber"} name={"phoneNumber"} />
            </Grid>
          </Grid>
        </Grid>
      </SettingCardGrid>
    </>
  );
};
