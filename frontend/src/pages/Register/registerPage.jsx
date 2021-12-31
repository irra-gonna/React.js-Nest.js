import React from "react"
import Register from "./RegisterComponents/Register"
import { Grid, Link } from "@mui/material"

function register() {
  return (
    <Grid
      sx={{
        display: "flex",
        height: "90vh",
        width: "100vw",
      }}
      justifyContent="space-around"
      alignItems="center"
      borderTop="2px solid #73e725"
    >
      <div>
      <div><Link href="/" id="yowl">YOWL</Link></div>
      <Link href="/"><img id="rotate"className="img_login" src="/assets/img/img_login.png" alt="" /></Link>
      </div>
      <div>
        <h1>Register you</h1>
        <Register />
      </div>
    </Grid>
  )
}
export default register
