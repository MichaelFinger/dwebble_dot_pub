import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { useChangeTheme } from '../gatsby-theme-material-ui-top-layout/components/top-layout';

const ThemeToggle = () => {
  const theme = useTheme();
  const changeTheme = useChangeTheme();  
  
  const handleTogglePaletteType = () => {    
    const paletteType = theme.palette.type === 'light' ? 'dark' : 'light';

    changeTheme({ paletteType });
  };

  return (
    <div>
      <Tooltip title='Toggle light/dark mode.' enterDelay={300}>
        <IconButton
          color="inherit"
          onClick={handleTogglePaletteType}
        >
          {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ThemeToggle;