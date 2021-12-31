import React from 'react';
import { TextField, Box, Grid } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"

function Login({onEmailChange, onPasswordChange, email, password}) {
  return (
    <div>
      <Grid sx={{ marginRight: "100px" }}>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px", marginTop: "30px" }}
        >
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Email"
            name="email"
            variant="standard"
            color="success"
            value={email}
            onChange={onEmailChange}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}
        >
          <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Password"
            name="password"
            variant="standard"
            color="success"
            value={password}
            onChange={onPasswordChange}
          />
        </Box>
      </Grid>
    </div>
  )
}
export default Login;