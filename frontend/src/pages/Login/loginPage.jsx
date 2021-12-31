import React, { useState } from "react"
import Login from "./LoginComponents/Login"
import Button from "../../components/Button"
import { Grid } from "@mui/material"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { Link } from "@mui/material"
import axios from "axios"
import { Button as Buton } from "@mui/material"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [messError, setMessError] = useState(false)

  const onSubmit = async () => {
    const fd = new URLSearchParams()
    fd.append("email", email)
    fd.append("password", password)

    try {
      await axios
        .post("http://localhost:5000/User/login", fd, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.code === 1) {
            console.log('error')
            setError(res.data.message)
            setMessError(true)
          } else {
            window.location.href = "/"
          }
          console.log(res.data.message)
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.error) {
          throw new Error(error.response?.data.error)
          console.log(error.response)
        }
      }
    }
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

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
        <div>
          <Link href="/" id="yowl">
            YOWL
          </Link>
        </div>
        <Link href="/">
          <img
            id="rotate"
            className="img_login"
            src="/assets/img/img_login.png"
            alt=""
          />
        </Link>
      </div>
      <div>
        {messError && (
          <Buton variant="contained" color="error">
            {error}
          </Buton>
        )}

        <h1>Member Login</h1>
        <Login
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          email={email}
          password={password}
        />
        <Button
          id="bttn"
          onClick={onSubmit}
          sx={{ marginLeft: "30px" }}
          name="Login"
        />
        <div id="log">
          <Link id="link" href="/register">
            Create your Account
            <ArrowRightAltIcon />
          </Link>
        </div>
      </div>
    </Grid>
  )
}

export default LoginPage
