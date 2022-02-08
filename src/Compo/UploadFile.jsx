import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  Container,
  ListItemAvatar,
  Typography,
  Grid,
  LinearProgress,
  IconButton
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import FileContext from "../context/FileContext";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
export const UploadFile = (props) => {
  const context = useContext(FileContext);
  let {isUploading ,  setIsUploading } = context;
  let { file, name } = props.file;
  // eslint-disable-next-line
  const [documentes, setDocumentes] = useState(file);
  // eslint-disable-next-line
  const [docs, setDocs] = useState([]);
  // eslint-disable-next-line
  const [showloading, setShowloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [isAborted, setIsAborted] = useState(false);

  let url = "http://localhost:8000";

  let handleSubmit = async () => {
    setShowloading(true);
    // send the form data to the server with progress bar with XHR
    let sendFile = (fd) => {
      let xhr = new XMLHttpRequest();
      setIsUploading(true);
      xhr.open("POST", `${url}/api/upload/`);
      xhr.onload = () => {
        if (xhr.status === 201) {
          setShowloading(false);
          setIsUploading(false);
          setShowStatus(true);
          setDocs(JSON.parse(xhr.responseText));
        }
      };
      xhr.upload.onprogress = (e) => {
        // calculate the progress and round it to 2 decimal places
        let percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
        console.log(percent);
        console.log(isAborted);
        if (isAborted) {
          xhr.abort();
        }
      };
      
      // abort the upload if the user clicks the cancel button
      xhr.onabort = () => {
        // let abort = new AbortController();
        // abort.abort();
        xhr.abort();
        console.log("Upload aborted.");
      };

      
      
      xhr.send(fd);
      
    };

    let fd = new FormData();
    fd.append("file", documentes);
    fd.append("name", documentes.name.split(".")[0]);
    fd.append("type", documentes.name.split(".")[1]);
    sendFile(fd);
    
  };

  // abort the upload if the user clicks the cancel button 
  let handleCancel = () => {
    setIsAborted(true);
    console.log(isAborted);
    console.log('Aborted')
    setShowloading(false);
    setIsUploading(false);
  };


  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, []);

  //upload this Single File
  return (
    <div>
      <List>
        <ListItem 
        secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={handleCancel} >
                     {
                       showStatus ? <CheckCircleOutlineSharpIcon color="success" /> : <CancelIcon />
                     }
                    </IconButton>
                  }
            >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"span"}>
                {name} -
                <Typography component={"span"} sx={{ color: `green` }}>

                  {setShowStatus ? " Uploaded" : " Uploading..."}
                </Typography>
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Container>
        {
          isUploading &&
          <Grid container justifyContent="space-between" alignItems="center">
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: 80 + "%" }}
            />
            <Typography>{progress}%</Typography>
          </Grid>
        }
      </Container>
    </div>
  );
};
