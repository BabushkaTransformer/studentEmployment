import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router';
import { useDarkMode } from '../../hooks/useDarkMode';
import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  ListItemIcon,
  TextField
} from '@mui/material';
import {
  ADMIN_ROUTE_PATH,
  EVENT_CREATE_ROUTE_PATH,
  POST_CREATE_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  RESUME_CREATE_ROUTE_PATH,
  VACANCY_CREATE_ROUTE_PATH
} from '../../constants';
import {
  Article,
  Edit,
  EventNote,
  Login,
  Logout,
  TransitEnterexit,
  Work
} from '@mui/icons-material';
import { authAPI } from '../../store/services/AuthService';

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
    width: `100%`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const Header = ({ open, toggleDrawer, drawerWidth }) => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createEl, setCreateEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');

  const menuOpen = Boolean(anchorEl);
  const createOpen = Boolean(createEl);

  const [logOut] = authAPI.useSignOutMutation();

  const createData = [
    {
      icon: Work,
      title: t('sidebar.createVacancy'),
      path: VACANCY_CREATE_ROUTE_PATH
    },
    {
      icon: Article,
      title: t('sidebar.createResume'),
      path: RESUME_CREATE_ROUTE_PATH
    },
    {
      icon: Edit,
      title: t('sidebar.createPost'),
      path: POST_CREATE_ROUTE_PATH
    },
    {
      icon: EventNote,
      title: t('sidebar.createEvent'),
      path: EVENT_CREATE_ROUTE_PATH
    }
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreate = (event) => {
    setCreateEl(event.currentTarget);
  };

  const handleCloseCreate = () => {
    setCreateEl(null);
  };

  const handleSearch = (event) => {
    if (event.charCode === 13) {
      navigate({
        pathname: '/search-result',
        search: createSearchParams({
          title: searchValue
        }).toString()
      });
      setSearchValue('');
    }
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
    >
      <Toolbar className="flex-between" sx={{ pr: '24px' }}>
        <Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px'
              // ...(open && { display: 'none' })
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
        </Box>

        <Box className="flex-center" gap={10}>
          <TextField
            placeholder="Поиск"
            size="small"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={handleSearch}
            sx={{
              background: isDarkMode ? 'dark' : 'white',
              borderRadius: '5px',
              width: '400px'
            }}
          />
          <Button
            id="basic-button"
            variant="contained"
            sx={{ background: 'white', color: 'black', ':hover': { background: '#e3f2fd' } }}
            aria-controls={createOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={createOpen ? 'true' : undefined}
            onClick={handleOpenCreate}
          >
            Создать
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={createEl}
            open={createOpen}
            onClose={handleCloseCreate}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            sx={{ mt: 1 }}
          >
            {createData.map(each => (
              <MenuItem
                key={each.path}
                component={Link}
                to={each.path}
                onClick={handleCloseCreate}
              >
                <ListItemIcon>
                  <each.icon fontSize="small"/>
                </ListItemIcon>
                {each.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>


        <Box>
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
            <MenuItem component={Link} to={ADMIN_ROUTE_PATH}>
              <ListItemIcon>
                <TransitEnterexit fontSize="small"/>
              </ListItemIcon>
              Админ
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
