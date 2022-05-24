import React from 'react';
import { Outlet } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Toolbar,
  Container
} from '@mui/material';
import { Header } from './common/Header';
import { useDarkMode } from '../hooks/useDarkMode';
import { AdminSidebar } from './common/AdminSidebar';

const drawerWidth = 260;

export const AdminLayout = () => {
  const { isDarkMode } = useDarkMode();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const mdTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light'
        }
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <Header
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <AdminSidebar
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar/>
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
            <Outlet/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
