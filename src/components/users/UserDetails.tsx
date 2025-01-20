import {Box, TextField} from "@mui/material";
import {User} from "@/app/api/admin/users/route";

type UserDetailsProps = {
    user: User,
}

export const UserDetails = (props: UserDetailsProps) => {
    const { user } = props;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            margin: "0 auto",
        }}>
            <TextField label={"id"} value={user.id} />
        </Box>
    )
}