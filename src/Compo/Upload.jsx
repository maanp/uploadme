import { Container, Paper, Typography, Stack, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import FolderIcon from '@mui/icons-material/Folder';


export const Upload = () => {
  const [documentes, setDocumentes] = useState({ name: "", file: null });
  const [docs, setDocs] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const [showalert, setShowalert] = useState(false);
  const [progress, setProgress] = useState(0);
  

  let setp = ()=>{
    setInterval(() => {
      setProgress((oldProgress) => {
        
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  }
  
  let url = `https://uploadme.pythonanywhere.com`;
//   let url = 'http://localhost:8000'



  let handleSubmit =async () => {
    setShowloading(true)
    console.log(showloading);
    console.log('sending data');
    let fd = new FormData()
    console.log((documentes.file.name).split('.')[0]);
    console.log(documentes);
    fd.append('file', documentes.file);
    fd.append('name', (documentes.file.name).split('.')[0]);
    fd.append('type', (documentes.file.name).split('.')[1]);
    console.log(fd.get('file'), fd.get('name'));

    console.log(showloading);
    await fetch(`${url}/api/upload/`,
      {
        method: 'POST',
        body: fd
      }).then((d) => d.json()).then((d) => setDocs(d)).catch((err) => console.log(err))
    setShowalert(true)
    console.log(showloading);
    setShowloading(false)
    console.log("Success");
    console.log(showloading);
    setTimeout(() => {
      setShowalert(false)
    }, 1000);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Input = styled('input')({
    display: 'none',
  });

  return <div>
    <Container>

      <Paper >
        <Typography variant='h4' gutterBottom>Upload Your Files</Typography>
        <div className="uploader">
          <Container maxWidth='xs' sx={{ mb: 2 }}>

            <Stack spacing={2}>
              {/* <input type="file" name="file" id="file" onChange={(e) => setDocumentes({ ...documentes, [e.target.name]: e.target.files[0] })} /> <br /> */}
              <label htmlFor="contained-button-file">
              <Input  id="contained-button-file"   type="file" name="file"  onChange={(e) => {setDocumentes({ ...documentes, [e.target.name]: e.target.files[0] });setp() }}/>
              <Button variant="outlined" component="span">
                Select file
              </Button>
            </label>
            {
              documentes.file &&   
              <Box sx={{ width: '100%' }}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={documentes!=null?documentes.file.name:""}/>
                  </ListItem>
                </List>
                    <LinearProgress variant="determinate" value={progress} />
              </Box>
            }

              <LoadingButton
                // onClick={()=>{setShowloading(!showloading);setShowalert(true)}}
                onClick={handleSubmit}
                loading={showloading}
                loadingPosition="end"
                variant="contained"
                endIcon={<CloudUploadIcon />}
              >
                Upload
              </LoadingButton>
            </Stack>
          </Container>
        </div>
      </Paper>
    </Container>
    <Snackbar open={showalert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setShowalert(false)} autoHideDuration={1000}
      action={
        <>
        <Button>Undo</Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setShowalert(false)}> <CloseIcon /> </IconButton>
        </>
        }>
      <Alert severity="success" sx={{ width: '100%' }}>
        Your document has been uploaded successfuly.
      </Alert>
    </Snackbar>
    {/* <Alert severity="success">This is a success message!</Alert> */}

  </div>;
};
