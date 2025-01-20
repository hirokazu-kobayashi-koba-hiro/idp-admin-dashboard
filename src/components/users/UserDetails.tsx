import { Grid } from "@mui/material";
import { User } from "@/app/api/admin/users/route";
import { LabeledTypography } from "@/components/LabeledTypography";

type UserDetailsProps = {
  user: User;
};

export const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <LabeledTypography label={"id"} value={user.id} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabeledTypography label={"name"} value={user.name} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabeledTypography label={"email"} value={user.email} />
      </Grid>
    </Grid>
  );
};
