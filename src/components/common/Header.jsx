import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTranslation } from '../../hooks/useTranslation';

import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem, Select,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {
  ABOUT_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  RESUME_ROUTE_PATH,
  VACANCY_ROUTE_PATH
} from '../../constants';
import { Login, Logout } from '@mui/icons-material';
import { authAPI } from '../../store/services/AuthService';
import { useSelector } from 'react-redux';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const Header = ({ open, toggleDrawer, drawerWidth }) => {
  const { language, setLanguage, t } = useTranslation();
  const { user } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuOpen = Boolean(anchorEl);
  const [logOut] = authAPI.useSignOutMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    { title: t('navbar.vacancy'), path: VACANCY_ROUTE_PATH },
    { title: t('navbar.resume'), path: RESUME_ROUTE_PATH },
    { title: t('navbar.about'), path: ABOUT_ROUTE_PATH },
    { title: 'Форум', path: '/posts' },
    { title: 'Мероприятия', path: '/events' }
  ];

  return (
    <AppBar
      position="absolute"
      open={open}
      drawerWidth={drawerWidth}
    >
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon/>
        </IconButton>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          {pages.map((page) => (
            <Button
              key={page.path}
              component={Link}
              to={page.path}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
          >
            <Avatar src={user?.avatar || ''} sx={{ width: 32, height: 32 }}/>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user?.id && (
            <MenuItem component={Link} to={PROFILE_ROUTE_PATH}>
              <Avatar src={user?.avatar}/> Профиль
            </MenuItem>
          )}
          {user?.id && (
            <Divider/>
          )}
          <MenuItem>
            <FormControl>
              <Select
                value={language}
                sx={{ minWidth: 130 }}
                onChange={(event) => setLanguage(event.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="ru">Русский</MenuItem>
                <MenuItem value="kg">Кыргызча</MenuItem>
              </Select>
            </FormControl>
          </MenuItem>
          {user?.id ? (
            <MenuItem onClick={logOut} sx={{ py: '10px' }}>
              <ListItemIcon>
                <Logout fontSize="small"/>
              </ListItemIcon>
              Выйти
            </MenuItem>
          ) : (
            <MenuItem component={Link} to="/login">
              <ListItemIcon>
                <Login fontSize="small"/>
              </ListItemIcon>
              Войти
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
