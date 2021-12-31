import {useState} from "react";
import {
  Card,
  Box,
  TextareaAutosize,
  Popover,
  Typography,
  Button,
  
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Cookies from "js-cookie";

const BasicPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //const [post, setPost]=useState([])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const cookie = Cookies.get("jwtToken");

  const onSubmit = () => {
    const params = new URLSearchParams();
    params.append("title", title);
    params.append("content", content);
    params.append("cookie", cookie);
    axios
      .post("http://localhost:5000/post", params)
      .then((response) => {
        //setPost(response.data.savedPost)
        //setTitle('')
        //setContent('')
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  

  return (
    <div>
      <Button
        id="bttn-popup"
        aria-describedby={id}
        color="success"
        variant="contained"
        onClick={handleClick}
      >
        <EditIcon style={{ fontSize: "small", marginRight: "10px" }} />
        <Typography>New post</Typography>
      </Button>
      <Popover
        className="popup"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card id="popup-comment">
          <Typography id="popup-font" sx={{ p: 2 }}>
            TITLE
          </Typography>
          <Box>
            <TextareaAutosize
              placeholder="Add a title..."
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
                backgroundColor: "white",
                width: "400px",
                marginLeft: "17px",
                marginRight: "17px",
                borderRadius: "5px",
                outline: "none",
                minHeight: "30px",
                fontFamily: "Helvetica Neue",
                fontSize: "20px",
              }}
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
            <Typography id="popup-font" sx={{ p: 2 }}>
              COMMENT
            </Typography>
            <TextareaAutosize
              placeholder="Add a Comment..."
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
                backgroundColor: "white",
                width: "400px",
                marginLeft: "17px",
                marginRight: "17px",
                borderRadius: "5px",
                outline: "none",
                minHeight: "30px",
                fontFamily: "Helvetica Neue",
                fontSize: "20px",
              }}
              name="Content"
              value={content}
              onChange={handleContentChange}
            />
            <Button
                id="btn-coment"
                icon="edit"
                variant="contained" 
                anchorEl={anchorEl}
                onClose={handleClose}  
                onClick={onSubmit}
                color="success"
                style={{
                  margin: "20px",
                }}
              >
                <EditIcon style={{ fontSize: "small", marginRight: "10px" }} />
                <Typography>Add</Typography>
              </Button>
            
          </Box>
        </Card>
      </Popover>
    </div>
  );
};

export default BasicPopover;
