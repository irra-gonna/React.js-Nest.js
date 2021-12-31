import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { Container, Grid } from "@mui/material";

//import Cookies from "js-cookie";

export function Profile() {
  let { username } = useParams();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    name: "",
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/User/${username}`).then((response) => {
      setProfile(response.data);
      console.log(profile);
      setPosts(response.data.posts);
    });
  }, [profile, username]);

  return (
    <div>
      <Container>

      </Container>
      <Container>
        <Grid
          container
          spaching={3}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            style={{
              width: "550px",
              height: "300px",
            }}
          >
            {posts.map((post, key) => {
              return <ProfileCard key={key} post={post} />;
            })}
            {((username, key) => {
              return <ProfileCard key={key} username={username} />;
            })}
          </Grid>
        </Grid>
      </Container>
      <Container></Container>

      <div>
        <Avatar alt={profile.name} src="/static/images/avatar/1.jpg" />

        <p>{profile.username}</p>

        <p>{profile.email}</p>

        <p>{profile.name}</p>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}

export default Profile;
