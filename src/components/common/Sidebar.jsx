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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar
} from '@mui/material';
import {
  ChevronLeft,
  DarkMode,
  Forum,
  Search,
  Article,
  EventNote
} from '@mui/icons-material';
import {
  EVENT_ROUTE_PATH,
  RESUME_ROUTE_PATH,
  VACANCY_ROUTE_PATH
} from '../../constants';

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

const FixedBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' })(
  ({ theme, open, drawerWidth }) => ({
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    marginTop: "64px",
    height: 'calc(100vh - 64px)',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7)
      }
    })
  })
);

export const Sidebar = ({ open, toggleDrawer, drawerWidth }) => {
  const { t } = useTranslation();
  const { isDarkMode, toggle } = useDarkMode();

  const sidebarData = [
    {
      icon: Search,
      title: t('navbar.vacancy'),
      path: VACANCY_ROUTE_PATH
    },
    {
      icon: Article,
      title: t('navbar.resume'),
      path: RESUME_ROUTE_PATH
    },
    {
      icon: Forum,
      title: t('navbar.forum'),
      path: '/posts'
    },
    {
      icon: EventNote,
      title: t('navbar.events'),
      path: EVENT_ROUTE_PATH
    }
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      drawerWidth={drawerWidth}
    >
      <FixedBox
        open={open}
        drawerWidth={drawerWidth}
      >
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
      </FixedBox>
    </Drawer>
  );
};
