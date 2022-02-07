import { Container, Paper, Typography, Stack, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Card, Grid } from '@mui/material';
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
import { blue, green, grey } from '@mui/material/colors';
import { ListItemSecondaryAction } from '@mui/material';


export const Upload = () => {
  const [documentes, setDocumentes] = useState([]);
  const [docs, setDocs] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const [showalert, setShowalert] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showstatus, setShowstatus] = useState(false);
  const [progressEach, setProgressEach] = useState([]);


  // let url = `https://uploadme.pythonanywhere.com`;
  let url = 'http://localhost:8000';



  let handleSubmit = async () => {
    setShowloading(true)
    console.log(showloading);
    console.log('sending data');
    // console.log((documentes.file.name).split('.')[0]);
    // console.log(documentes);
    // fd.append('file', documentes.file);
    // fd.append('name', (documentes.file.name).split('.')[0]);
    // fd.append('type', (documentes.file.name).split('.')[1]);
    // console.log(fd.get('file'), fd.get('name'));



    setShowstatus(true)
    // send the form data to the server with progress bar with XHR
    let sendFile = (fd) => {

      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${url}/api/upload/`);
      xhr.onload = () => {
        if (xhr.status === 201) {
          setShowloading(false)
          console.log(showloading);
          console.log('data sent');
          setDocs(JSON.parse(xhr.responseText));
          setShowalert(true);

        }
      }
      xhr.upload.onprogress = (e) => {
        // calculate the progress and round it to 2 decimal places
        let percent = Math.round((e.loaded / e.total) * 100);
        // let percent = (e.loaded / e.total) * 100;
        console.log(progressEach.length);
        if (progressEach.length > 3) {
          setProgressEach([])
        }
        setProgressEach((pre) => [...pre, percent]);
        console.log(progressEach);
        // if (e.lengthComputable) {
        //   setProgress(e.loaded / e.total * 100);
        //   console.log(progress);
        // }
      }
      xhr.send(fd);
    }







    //loop through the documentes array and add each file and file name to the form data and set progresssbar for each file 
    documentes.forEach(element => {
      console.log('sending req')
      let fd = new FormData()
      fd.append('file', element.file);
      fd.append('name', element.name.split('.')[0]);
      fd.append('type', element.file.name.split('.')[1]);
      sendFile(fd)
    });



    // await fetch(`${url}/api/upload/`, {
    //   method: 'POST',
    //   body: fd,
    //   onUploadProgress: (progressEvent) => {
    //     setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
    //     console.log(progress);
    //   }
    // }).then((d) => d.json()).then((d) => console.log(d))
    // setShowloading(false)
    // console.log(showloading);
    // setShowalert(true)
    // console.log(showalert);





    // loop through the form data and send it to the server
    // for (var pair of fd.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log(fd.get('file'), fd.get('name'));

    console.log(showloading);
    //  fetch(`${url}/api/upload/`,
    //   {
    //     method: 'POST',
    //     body: fd
    //   }).then((d) => d.json()).then((d) => setDocs(d)).catch((err) => console.log(err))
    // setShowalert(true)
    // console.log(showloading);
    // setShowloading(false)
    // console.log("Success");
    // console.log(showloading);
    // setTimeout(() => {
    //   setShowalert(false)
    // }, 1000);
  }

  // handle Change event with the file input and set file and name to the state
  let handleChange = (e) => {
    // loop through the files and set the file and name to the state
    for (let i = 0; i < e.target.files.length; i++) {
      setDocumentes((oldDocumentes) => [...oldDocumentes, { file: e.target.files[i], name: e.target.files[i].name }])
    }

    // let file = e.target.files[0];
    // let name = e.target.files[0].name;
    // setDocumentes([...documentes, { file, name }]); 
    console.log(documentes);
    // setp();
  }



  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Input = styled('input')({
    display: 'none',
  });

  // add event to the dropzone
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('dragover',e.target);

    document.querySelector('#drop_zone').setAttribute('style', `border :3px solid ${blue[800]}; background-color: ${grey[200]}`);
    document.querySelector('#drop_text').innerHTML = "Release files here...";
    // document.querySelector('#drop_zone').remove  ('style', `border :2px solid ${blue[500]}`);
    // console.log(e.dataTransfer.files);
    // setDocumentes({ name: e.dataTransfer.files[0].name, file: e.dataTransfer.files[0] });
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('#drop_zone').removeAttribute('style', `border :2px solid ${blue[500]}`);
    document.querySelector('#drop_text').innerHTML = "Drop files here";

  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // document.querySelector('#drop_zone').setAttribute('style', `border :2px solid ${blue[800]}`);
    document.querySelector('#drop_zone').removeAttribute('style', `border :2px solid ${blue[500]}`);

    console.log(e.dataTransfer.files);
    let files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      setDocumentes((pre) => [...pre, { name: files[i].name, file: files[i] }]);
      // console.log(documentes);


    }
    // setDocumentes([...documentes  ,{ name: e.dataTransfer.files[0].name, file: e.dataTransfer.files[0] }]);
    // console.log(documentes);
  }


  return <div>
    <Container >

      <Paper >
        <Typography variant='h4' gutterBottom>Upload Your Files</Typography>
        <div className="uploader" >
          <Container maxWidth='sm' sx={{ mb: 2 }}>
            <Stack spacing={2}>
              {/* <input type="file" name="file" id="file" onChange={(e) => setDocumentes({ ...documentes, [e.target.name]: e.target.files[0] })} /> <br /> */}
              <label htmlFor="contained-button-file">
                <Input id="contained-button-file" multiple={true} type="file" name="file" onChange={handleChange} />
                <Container variant="outlined" component="span" >
                  <Box sx={{ border: `2px dotted blue`, borderRadius: '5px', background: `${grey[100]}`, height: 200 + 'px' }} id="drop_zone" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} >
                    <Stack direction='column' spacing={3}>
                      <Typography margin={1} id="drop_text">
                        Drop Your File here
                      </Typography>
                      <Typography>Or </Typography>
                      <Typography margin={1} sx={{ color: `${blue[800]}` }}>Choose Files</Typography>
                    </Stack>
                  </Box>
                </Container>
              </label>
              {
                documentes &&
                <Box sx={{ width: '100%' }}>
                  {
                    console.log(documentes),
                    //   documentes.map((d, i) => {
                    //     return <ListItem key={i}>
                    //       <ListItemText primary={d.name} />
                    //     </ListItem>
                    //   })
                    documentes.length != null &&
                    documentes.map((d, i) => {
                      return (
                        <div key={i} >
                         
                        </div>
                      )
                    })
                  }
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
