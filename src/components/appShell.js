import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Footer from './footer';
// import ResponsiveDrawer from './responsiveDrawer';
import TemporaryDrawer from './temporaryDrawer';
import TopAppBar from './topAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.level1,
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },  
  toolbar: theme.mixins.toolbar
}));


const AppShell = ({ children }) => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMobileOpen(open);
  };


  return (
    <React.Fragment>      
      <div className={classes.root}>
        <TemporaryDrawer 
          open={mobileOpen}
          toggleDrawer={toggleDrawer}
        />

        <TopAppBar handleDrawerToggle={handleDrawerToggle} />
        
        {/* <ResponsiveDrawer 
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        /> */}      
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container fixed>
            {children}            
          </Container>          

          <Footer />
        </main>        
      </div>
    </React.Fragment>
  );
}

export default AppShell;