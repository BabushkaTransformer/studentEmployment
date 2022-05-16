import React from 'react';
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
  ListItemText, Switch,
  Toolbar
} from '@mui/material';
import { ChevronLeft, Edit, Person, DarkMode } from '@mui/icons-material';
import { PROFILE_ROUTE_PATH, VACANCY_CREATE_ROUTE_PATH } from '../../constants';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

const sidebarData = [
  {
    icon: Person,
    title: "Профиль",
    path: PROFILE_ROUTE_PATH
  },
  {
    icon: Edit,
    title: "Создать вакансию",
    path: VACANCY_CREATE_ROUTE_PATH
  }
];

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

export const Sidebar = ({ open, toggleDrawer, drawerWidth }) => {
  const { isDarkMode, toggle } = useDarkMode();

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
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between"
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
              <ListItemText primary={el.title} />
            </ListItemButton>
          ))}
        </Box>
        <ListItem
          onClick={toggle}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary="Темная тема" />
          <Switch
            edge="end"
            checked={isDarkMode}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};
