import { Card, } from "@mui/material";
import { CardContent } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Typography, Box, TextareaAutosize } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  
  const LiveCookie = Cookies.get("jwtToken");

  if (LiveCookie === undefined) {
    return (
      <Card id="card">
        <CardContent id="card-header">
          <Typography style={{width:"520px", color:"white", fontSize:"20px"}}></Typography>
        </CardContent>
        <CardContent id="text">
          <Typography style={{ fontSize: "20px" }}>{post.title}</Typography>
        </CardContent>
        <CardContent id="text">
          <Typography style={{ fontSize: "20px" }}>{post.content}</Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <Card id="card">
        <CardContent id="card-header">
          {/* <Link to={`/profile/${username}`} /> */}
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

