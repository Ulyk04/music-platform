import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Home from '@mui/icons-material/Home'
import LibraryMusic from '@mui/icons-material/LibraryMusic'
import Search from '@mui/icons-material/Search';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import HomePage from '../component/HomePage';
import  Grid  from '@mui/material/Grid';
import { PageContainer } from '@toolpad/core/PageContainer';
const NAVIGATION = [
  {
    segment: 'home',
    title: 'Home',
    icon: <Home />,
  },
  {
    segment: 'library',
    title: 'Library',
    icon: <LibraryMusic />,
  },
  {
    segment:'search',
    title:'Search',
    icon:<Search/>,
  },
  {
    segment:'favorite',
    title:'Create Playlist',
    icon:<FavoriteBorder/>, 
  }
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    
    <DemoProvider window={demoWindow}>
      
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
          title: 'MUI',
          homeUrl: '/toolpad/core/introduction',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <PageContainer>
            <Grid>
              <Grid>
                {
                  router.pathname === '/home' && (
                    <HomePage/>
                  )
                }
              </Grid>
            </Grid>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
     
    </DemoProvider>
  );
}

DashboardLayoutBranding.propTypes = {
 
  window: PropTypes.func,
};

export default DashboardLayoutBranding;