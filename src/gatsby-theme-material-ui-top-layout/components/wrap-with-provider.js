import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';

import createTheme from '../theme';

const wrapWithProvider = ({ element }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createTheme(prefersDarkMode),
    [prefersDarkMode],
  );
  
  return <TopLayout theme={theme}>{element}</TopLayout>;
};

export default wrapWithProvider;