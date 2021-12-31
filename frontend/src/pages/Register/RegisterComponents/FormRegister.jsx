import React from "react"
import { TextField, Box, Grid, Link } from "@mui/material"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import PersonIcon from "@mui/icons-material/Person"
import { useState } from "react"
import Buton from "../../../components/Button"
import { Button } from "@mui/material"
import axios from "axios"

function FormRegister() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  })
  const [error, setError] = useState([])
  const [messError, setMessError] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const Submit = async () => {
    const params = new URLSearchParams()
    params.append("email", email)
    params.append("username", username)
    params.append("name", name)
    params.append("password", password)
    try {
      await axios
        .post("http://localhost:5000/User/register", params, {
          withCredentials: true,
        })
        
    } catch (error) {
      setError(error.response.data.message[0])
      setMessError(true)
    }
  }

  const { name, email, username, password } = formValue
  return (
    <Grid sx={{ marginRight: "100px" }}>
      {messError && (
        <Button variant="contained" color="error">
          {error}
        </Button>
      )}
      <h1>Register you</h1>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}
      >
        <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

        <TextField
          id="input-with-sx"
          label="Name"
          name="name"
          variant="standard"
          color="success"
          onChange={handleChange}
          value={name}
        />
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}
      >
        <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Email"
          name="email"
          variant="standard"
          color="success"
          onChange={handleChange}
          value={email}
        />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", marginBottom: "30px" }}
      >
        <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Username"
          name="username"
          variant="standard"
          color="success"
          onChange={handleChange}
          value={username}
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
          onChange={handleChange}
          value={password}
        />
      </Box>
      <Buton onClick={Submit} sx={{ marginLeft: "30px" }} name="Register" />
      <div id="log">
        <Link id="link" href="/Login">
          Already un account? <ArrowRightAltIcon />
        </Link>
      </div>
    </Grid>
  )
}

export default FormRegister
