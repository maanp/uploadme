import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import React from 'react';
// import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export const Spinner = () => {
  return <div>
      <>
            <ListItem secondaryAction={
              <IconButton aria-label="open" onClick={() => { }}>
                <DeleteOutlineOutlinedIcon />
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
                <DeleteOutlineOutlinedIcon />
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
                <DeleteOutlineOutlinedIcon />
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

  </div>;
};
