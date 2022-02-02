import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Paper, Typography, Box, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, ListItemAvatar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import Divider from '@mui/material/Divider';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Skeleton from '@mui/material/Skeleton';

export const Home = () => {
  const [value, setValue] = React.useState('one');
  const [docs, setDocs] = useState([]);
  let url = `https://uploadme.pythonanywhere.com`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch(`${url}/api/upload/`).then((d) => d.json()).then((d) => setDocs(d))
  }, []);

  let getIcon = (type) => {
    // switch (type) {
    //   case 'pdf':
    //     return <PictureAsPdfIcon />
    //   case 'img':
    //     return <ImageIcon />
    //   case  'svg':
    //     return <ImageIcon />
    //   case 'doc':
    //     return <ArticleIcon />
    //   default:
    //     return <FolderIcon />
    // }
    if (type == 'pdf') return <PictureAsPdfIcon />
    else if (type == 'img'|| type == 'svg' || type == 'jpg' || type == 'jpeg' || type == 'png') return <ImageIcon />
    else if (type == 'doc') return <ArticleIcon />
    return <FolderIcon />
  }

  return <div>
    <Container maxWidth='md'>

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Your documents" />
          <Tab value="two" label="Favourite" />
          <Tab value="three" label="Account" />
        </Tabs>
      </Box>
      <List >
        {
          
           docs.length ? docs.map((d) => (
            <div key={d.id}>
              {/* <img src={d.file} alt="" /> */}
              
              <ListItem secondaryAction={
                <IconButton aria-label="open" onClick={() => { window.open(d.file) }}>
//                   <StarBorderRoundedIcon />
                  <OpenInNewIcon />
                </IconButton>
              }>
                <ListItemAvatar >
                  <Avatar>
                    {getIcon(d.type)}
                  </Avatar>
                </ListItemAvatar>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText primary={<Typography >{d.name}.{d.type}</Typography>} secondary={(new Date(d.date_time)).toLocaleString()} />
              </ListItem>
              <Divider variant="inset" component="li" />

            </div>
          )) : 
            <>
              <ListItem secondaryAction={
                <IconButton aria-label="open" onClick={() => { }}>
                  <StarBorderRoundedIcon />
                  <OpenInNewIcon />
                </IconButton>
              }>
                <ListItemAvatar >
                  <Avatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Skeleton variant="text" animation='wave' width={80} />} secondary={<Skeleton variant="text" width={120} />} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem secondaryAction={
                <IconButton aria-label="open" onClick={() => { }}>
                  <StarBorderRoundedIcon />
                  <OpenInNewIcon />
                </IconButton>
              }>
                <ListItemAvatar >
                  <Avatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Skeleton variant="text" animation='wave' width={80} />} secondary={<Skeleton variant="text" width={120} />} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem secondaryAction={
                <IconButton aria-label="open" onClick={() => { }}>
                  <StarBorderRoundedIcon />
                  <OpenInNewIcon />
                </IconButton>
              }>
                <ListItemAvatar >
                  <Avatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Skeleton variant="text" animation='wave' width={80} />} secondary={<Skeleton variant="text" width={120} />} />
              </ListItem>
              <Divider variant="inset" component="li" />

            </>
        }
      </List>
      <Paper>


      </Paper>
    </Container>


  </div>;
};
