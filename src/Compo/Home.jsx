import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Paper, Typography, Box, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, ListItemAvatar, Stack, Menu, MenuItem, ListItemButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import Divider from '@mui/material/Divider';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Skeleton from '@mui/material/Skeleton';
import { Spinner } from './Spinner';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';



export const Home = () => {
  const [value, setValue] = React.useState('one');
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  // let url = `https://uploadme.pythonanywhere.com`;
  let url = 'http://localhost:8000'

  let fetchData = async () => {
    console.log('setting loading to true:===>', loading);
    setLoading(true)
    console.log(loading);
    await fetch(`${url}/api/upload/`).then((d) => d.json()).then((d) => setDocs(d))
    setLoading(false)
    console.log(loading);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchData()
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
    else if (type == 'img' || type == 'svg' || type == 'jpg' || type == 'jpeg' || type == 'png') return <ImageIcon />
    else if (type == 'doc') return <ArticleIcon />
    return <FolderIcon />
  }

  let handleDelete = (e) => {
    console.log(e.id)
    fetch(`${url}/api/upload/${e.id}/`, {
      method: 'DELETE'
    }).then((d) => d.json()).then((d) => console.log(d))
  }

  return <div>
    <Container maxWidth='md'>

      <Box sx={{ width: '100%' }}>
        <Stack direction='row'>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            sx={{ flexGrow: 1 }}
          >
            <Tab value="one" label="Your documents" />
            <Tab value="two" label="Favourite" />
            <Tab value="three" label="Account" />
          </Tabs>
          <IconButton onClick={fetchData}>
            <RefreshOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* <TabPanel value='one' > */}

      <List >

        {
          loading ? <Spinner /> : docs.length != 0 ?
            docs.map((d) => (
              <div key={d.id}>
                {/* <img src={d.file} alt="" /> */}

                <ListItem secondaryAction={
                  <>
                    {/* <IconButton aria-label="open" onClick={()=>handleDelete(d)} */}
                    <IconButton aria-label="open" onClick={(e) => setAnchorEl(e.currentTarget)}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      {/* <DeleteOutlineOutlinedIcon /> */}
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => window.open(d.file)}>
                        <ListItemIcon>
                          <OpenInNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Open</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(d)}>
                        <ListItemIcon>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => setAnchorEl(null)}>
                        <ListItemIcon>
                          <StarBorderRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>send</ListItemText>
                      </MenuItem>

                    </Menu>
                    {/* <IconButton aria-label="open" onClick={() => { window.open(d.file) }}>
                    
                    <OpenInNewIcon />

                  </IconButton> */}
                    
                  </>
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
            )) : "You haven't uploaded documents yet.Go to upload section."
        }
      </List>

      {/* </TabPanel> */}
    </Container>


  </div>;
};
