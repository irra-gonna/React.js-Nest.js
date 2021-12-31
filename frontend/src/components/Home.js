import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";
import { Container, Grid } from "@mui/material";
import PostCard from "./PostCard";
import Comment from "./Comment";

function Home(){
const [posts, setPosts] = useState([])
const [user,setUser]=useState([])
useEffect(() => {
  getAllPost();
  
},[]);

   

  const getAllPost = () => {
    axios
      .get("http://localhost:5000/post")
      .then((res) => {
        setPosts(res.data)
        
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

    const LiveCookie = Cookies.get("jwtToken");

    

    return (
      <section className="header">
        <div className="center">
          <div id="logo">
            <img src="/assets/img/Stick.png" alt="" />
            <span id="brand">
              <strong>YOWL</strong>
            </span>
          </div>
          <nav id="menu">
            {LiveCookie  === undefined ? (
              <ul id="right-ul">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/Profile">Profile</Link>
                </li>
                <li>
                  <Link to="/login" onClick={Logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </nav>
          <div className="clearfix"></div>
        </div>
        <div>
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
              <Comment />
              <Grid
                style={{
                  width: "550px",
                  height: "300px",
                }}
              >
                {posts.map((post, key) => {
                  return <PostCard key={key} post={post} />;
                })}
              </Grid>
            </Grid>
          </Container>
        </div>
      </section>
    );
  }

export default Home;
