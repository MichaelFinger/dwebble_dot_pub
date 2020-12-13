import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider, createMuiTheme, darken } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

import Viewport from 'gatsby-theme-material-ui-top-layout/src/components/viewport';

import { getCookie } from '../../components/utils';

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

const ThemeProvider = ({ children }) => {
  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType          
        };

      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, {});

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';
  const { paletteType = preferredType } = themeOptions;

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteType = getCookie('paletteType');

      dispatch({
        type: 'CHANGE',
        payload: { paletteType: nextPaletteType },
      });
    }
  }, []);

  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme({
      palette: {
        primary: {
          main: paletteType === 'light' ? indigo[700] : indigo[200]
        },
        secondary: {
          main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200]
        },
        type: paletteType,
        background: {
          default: paletteType === 'light' ? '#fff' : '#121212',
        }
      }
    });

    nextTheme.palette.background.level2 = 
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#333';

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900];

    return nextTheme;
  }, [paletteType])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

export default function TopLayout({ children, theme }) {
  return (
    <React.Fragment>
      <Viewport />
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
}

export const useChangeTheme = () => {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}