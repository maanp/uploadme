import {
  Container,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState, useContext  } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { blue, grey } from "@mui/material/colors";
import { UploadFile } from "./UploadFile";
import FileContext from "../context/FileContext";

export const Upload = () => {
  const context = useContext(FileContext);
  let {  isUploading  } = context;
  const [documentes, setDocumentes] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const [showalert, setShowalert] = useState(false);
  const [callFun, setCallFun] = useState(false);

  let handleSubmit = async () => {
    setShowloading(true);
    setCallFun(true);
    console.log(showloading);
    console.log("sending data");
  };

  // handle Change event with the file input and set file and name to the state
  let handleChange = (e) => {
    // loop through the files and set the file and name to the state
    for (let i = 0; i < e.target.files.length; i++) {
      setDocumentes((oldDocumentes) => [
        ...oldDocumentes,
        { file: e.target.files[i], name: e.target.files[i].name },
      ]);
    }

    // let file = e.target.files[0];
    // let name = e.target.files[0].name;
    // setDocumentes([...documentes, { file, name }]);
    console.log(documentes);
    // setp();
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const Input = styled("input")({
    display: "none",
  });

  // add event to the dropzone
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('dragover',e.target);

    document
      .querySelector("#drop_zone")
      .setAttribute(
        "style",
        `border :3px solid ${blue[800]}; background-color: ${grey[200]}`
      );
    document.querySelector("#drop_text").innerHTML = "Release files here...";
    // document.querySelector('#drop_zone').remove  ('style', `border :2px solid ${blue[500]}`);
    // console.log(e.dataTransfer.files);
    // setDocumentes({ name: e.dataTransfer.files[0].name, file: e.dataTransfer.files[0] });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document
      .querySelector("#drop_zone")
      .removeAttribute("style", `border :2px solid ${blue[500]}`);
    document.querySelector("#drop_text").innerHTML = "Drop files here";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // document.querySelector('#drop_zone').setAttribute('style', `border :2px solid ${blue[800]}`);
    document
      .querySelector("#drop_zone")
      .removeAttribute("style", `border :2px solid ${blue[500]}`);

    console.log(e.dataTransfer.files);
    let files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      setDocumentes((pre) => [...pre, { name: files[i].name, file: files[i] }]);
      // console.log(documentes);
    }
    // setDocumentes([...documentes  ,{ name: e.dataTransfer.files[0].name, file: e.dataTransfer.files[0] }]);
    // console.log(documentes);
  };

  return (
    <div>
      <Container>
        <Paper>
          <Typography variant="h4" gutterBottom>
            Upload Your Files
          </Typography>
          <div className="uploader">
            <Container maxWidth="sm" sx={{ mb: 2 }}>
              <Stack spacing={2}>
                {/* <input type="file" name="file" id="file" onChange={(e) => setDocumentes({ ...documentes, [e.target.name]: e.target.files[0] })} /> <br /> */}
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    multiple={true}
                    type="file"
                    name="file"
                    onChange={handleChange}
                  />
                  <Container variant="outlined" component="span">
                    <Box
                      sx={{
                        border: `2px dotted blue`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                        background: `${grey[100]}`,
                        height: 200 + "px",
                      }}
                      id="drop_zone"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <Stack direction="column" spacing={3}>
                        <Typography margin={1} id="drop_text">
                          Drop Your File here
                        </Typography>
                        <Typography>Or </Typography>
                        <Typography
                          margin={1}
                          sx={{ color: `${blue[800]}` }}
                          component="h3"
                        >
                          Choose Files
                        </Typography>
                      </Stack>
                    </Box>
                  </Container>
                </label>
                {documentes && (
                  <Box sx={{ width: "100%" }}>
                    {
                      documentes.length != null &&
                        documentes.map((d, i) => {
                          return (
                            <div key={i}>
                              <UploadFile
                                file={d}
                                fun={callFun}
                                doc={documentes}
                              />
                            </div>
                          );
                        })
                    }
                  </Box>
                )}
                <LoadingButton
                disabled={!isUploading || documentes.length === 0}
                  // onClick={()=>{setShowloading(!showloading);setShowalert(true)}}
                  onClick={handleSubmit}
                  loading={showloading || isUploading}
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
      <Snackbar
        open={showalert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShowalert(false)}
        autoHideDuration={1000}
        action={
          <>
            <Button>Undo</Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowalert(false)}
            >
              {" "}
              <CloseIcon />{" "}
            </IconButton>
          </>
        }
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your document has been uploaded successfuly.
        </Alert>
      </Snackbar>
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
};
