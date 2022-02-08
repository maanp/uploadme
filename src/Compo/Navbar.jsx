import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom';
import {  Button } from '@mui/material';


// import Link from '@mui/material/Link'
export const Navbar = () => {
  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('md')]: {
  //       width: '20ch',
  //     },
  //   },
  // }));

  // let handleSearch = async (e) => {
  //   // setShow(false)
  //   console.log(e.target.value);
  //   await fetch(`${url}/api/upload/?search=${e.target.value}`).then((d) => d.json()).then((d) => {setData(d); console.log(d.data)}).catch((d) => console.log(d))
  // }

  return <div>
    <AppBar position="sticky" color="primary" >
      <Toolbar>
        <IconButton aria-label="Open drawer" color='inherit' onClick={() => { }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Uploadme
        </Typography>
        {/* make search bar in mui*/}
       
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
