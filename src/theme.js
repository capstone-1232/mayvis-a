import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      // Use a combination of distinctive and readable fonts
      fontFamily: '"Work Sans", sans-serif', // Primary font for body text
      h1: {
        fontFamily: '"Merriweather", serif', // Distinctive font for large headings
        fontWeight: 700,
      },
      h2: {
        fontFamily: '"Merriweather", serif', // Keeping consistency in headings
        fontWeight: 700,
      },
      h3: {
        fontFamily: '"Merriweather", serif', // Consistent with other headings
        fontWeight: 700,
      },
      h4: {
        fontFamily: '"Merriweather", serif', // Distinctive font for smaller headings
        fontWeight: 700,
      },
      // Add more customizations for other variants if needed
    },
  });
  

  

export default theme;
