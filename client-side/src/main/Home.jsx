import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Home from '@mui/icons-material/Home'
import LibraryMusic from '@mui/icons-material/LibraryMusic'
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import HomePage from '../component/HomePage';
import  Grid  from '@mui/material/Grid';
import { PageContainer } from '@toolpad/core/PageContainer';
import Library from '../component/Library';
import CreatePlaylist from '../component/CreatePlaylist';
import MyPlaylists from '../component/MyPlaylist';


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
    segment:'playlist',
    title:'My playlist',
    icon:<PlaylistAddCheckCircleIcon/>,
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
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        background: {
          default: '#c8e0d1', 
          paper: '#cedbd3',
        },
        text: {
          primary: '#068399',
          secondary: '#0ecced',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#3d3a3a', 
          paper: '#4a4443',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
        },
      },
    },
  },
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
          title: 'My diss',
          homeUrl: '/toolpad/core/introduction',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <PageContainer sx={{backgroundColor:'background.default' ,minHeight: '100vh' , p: 2 }} >
            <Grid>
              <Grid>
                {
                  router.pathname === '/home' && (
                    <HomePage/>
                  )
                }
              </Grid>
              <Grid>
                {
                  router.pathname === '/library' && (
                    <Library/>
                  )
                }
              </Grid>
              <Grid>
                {
                  router.pathname === '/favorite' && (
                    <CreatePlaylist/>
                  )
                }
              </Grid>
              <Grid>
                {
                  router.pathname === '/playlist' && (
                    <MyPlaylists/>
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