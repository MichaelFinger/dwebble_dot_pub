import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'gatsby-theme-material-ui';

import ThemeToggle from './themeToggle';

import useNavbarLinks from '../hooks/navbarLinks';
import useSiteMetadata from '../hooks/siteMetadata';

// const drawerWidth = 240;

const useStyles = makeStyles((theme => ({
  appBar: {
    color: theme.palette.type === 'light' ? null : '#fff',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.primary : theme.palette.background.level2
  },
  grow: {
    flex: '1 1 auto'
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navlink: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
})));

export default function TopAppBar({ handleDrawerToggle }) {
  const classes = useStyles();
  let navbarLinks = useNavbarLinks();
  const siteMetadata = useSiteMetadata();

  navbarLinks.sort((a, b) => {
    return (a.index - b.index); 
  })

  const links = navbarLinks.map((navbarLink, index) => {
    return (
      <Link to={navbarLink.to} color="inherit" key={`navbar-link-${index + 1}`} className={classes.navlink}>
        <Typography variant="h6" noWrap>
          {navbarLink.name}
        </Typography>
      </Link> 
    )
  })

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}  
          color="inherit"          
        >
          <MenuIcon/>
        </IconButton>        
        <Link to="/" color="inherit">
          <Typography variant="h6" noWrap className={classes.title}>
            {siteMetadata.title}
          </Typography>
        </Link> 
        <div className={classes.grow} />
        {links}       
        <div className={classes.grow} />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  )
}