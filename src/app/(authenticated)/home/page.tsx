'use client'

import { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";

export default function Component() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={() => { console.log("click") }} style={{ width: "100%" }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}