import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useTranslation } from '../../hooks/useTranslation';

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import {
  Box,
  Divider,
  IconButton,
  List,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch
} from '@mui/material';
import {
  ChevronLeft,
  DarkMode,
  VerifiedUserSharp,
  Group,
  AdminPanelSettings
} from '@mui/icons-material';


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' })(
  ({ theme, open, drawerWidth }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7)
        }
      })
    }
  })
);

export const AdminSidebar = ({ open, toggleDrawer, drawerWidth }) => {
  const { t } = useTranslation();
  const { isDarkMode, toggle } = useDarkMode();

  const sidebarData = [
    {
      icon: AdminPanelSettings,
      title: 'Админ панель',
      path: '/admin'
    },
    {
      icon: VerifiedUserSharp,
      title: 'Студенты',
      path: '/students'
    },
    {
      icon: Group,
      title: 'Группы',
      path: '/groups'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      drawerWidth={drawerWidth}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft/>
        </IconButton>
      </Toolbar>
      <Divider/>
      <List
        component="nav"
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          {sidebarData.map(el => (
            <ListItemButton
              key={el.path}
              component={Link}
              to={el.path}
            >
              <ListItemIcon>
                <el.icon/>
              </ListItemIcon>
              <ListItemText primary={el.title}/>
            </ListItemButton>
          ))}
        </Box>
        <ListItem
          onClick={toggle}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <DarkMode/>
          </ListItemIcon>
          <ListItemText primary="Темная тема"/>
          <Switch
            edge="end"
            checked={isDarkMode}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi'
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};
