// theme.js

import { extendTheme } from '@chakra-ui/react';

const Theme = extendTheme({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: '#CBD5E0'
      },
      '.login-container': {
        bg: '#ffff',
      },
    },
  },
});

export default Theme;
