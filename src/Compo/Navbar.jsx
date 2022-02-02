import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import  MenuIcon  from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import Link from '@mui/material/Link'
export const Navbar = () => {
  return <div>
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton aria-label="Open drawer" color='inherit' onClick={() => { }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Uploadme
        </Typography>
        <Button variant="text" color="inherit" component={Link} to='/' >
          Home
        </Button>
        <Button variant="text" color="secondary" component={Link} to='/upload' >
          Upload
        </Button>
      </Toolbar>
    </AppBar>

  </div>;
};
