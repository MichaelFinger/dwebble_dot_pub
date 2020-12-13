import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

const ResponsiveDrawer = (props) => {
  const { handleDrawerToggle, mobileOpen, window } = props;

  const classes = useStyles();  
  const container = window !== undefined ? () => window().document.body : undefined;

  const navItems = null;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="js">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          <Divider />

          {navItems}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          <Divider />

          {navItems}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default ResponsiveDrawer;
