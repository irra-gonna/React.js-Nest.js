import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Typography, Box, TextareaAutosize } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

//import Cookies from "js-cookie";

export default function ProfileCard({ post, username }) {
  return (
    
      <div>
        <Card id="card">
          <CardContent id="card-header">
            <Card
              href="/profile/{username}"
              style={{ width: "520px", color: "white", fontSize: "20px" }}
            >{username}</Card>
            <Box>
              <IconButton id="text">
                <DeleteOutlined onClick={() => console.log("delete", post)} />
              </IconButton>
            </Box>
          </CardContent>
          <CardContent id="text">
            <Typography style={{ fontSize: "20px" }}>{post.title}</Typography>
          </CardContent>
          <CardContent id="text">
            <Typography style={{ fontSize: "20px" }}>{post.content}</Typography>
          </CardContent>
          <Box id="textarea">
            <TextareaAutosize
              placeholder="Add a comment..."
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
                backgroundColor: "white",
                width: "400px",
                marginLeft: "17px",
                borderRadius: "5px",
                outline: "none",
                minHeight: "30px",
                fontFamily: "Helvetica Neue",
                fontSize: "20px",
              }}
            />
            <Button
              id="btn-coment"
              icon="edit"
              variant="contained"
              color="success"
            >
              <EditIcon style={{ fontSize: "small", marginRight: "10px" }} />
              Reply
            </Button>
          </Box>
        </Card>
      </div>
  
  );
}

