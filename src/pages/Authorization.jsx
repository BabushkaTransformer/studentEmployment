import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  CssBaseline
} from '@mui/material';
import { authAPI } from '../store/services/AuthService';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUid } from '../store/slices/AuthSlice';
import { toast } from 'react-hot-toast';

const authErrorTexts = {
  "auth/invalid-email": "Неккоретный email",
  "auth/user-not-found": "Пользователь не найден",
};

const formData = [
  {
    type: 'text',
    name: 'firstName',
    label: 'Ваше имя',
    required: true,
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Ваша фамилия',
    required: true
  },
  {
    type: 'email',
    name: 'email',
    label: 'Ваше email',
    required: true,
    isSignIn: true
  },
  {
    type: 'text',
    name: 'company',
    label: 'Ваша компания',
    required: true
  },
  {
    type: 'text',
    name: 'password',
    label: 'Ваш пароль',
    required: true,
    isSignIn: true
  }
];

const theme = createTheme();

export const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = React.useState('');
  const [isSignIn, setIsSignIn] = React.useState(true);

  const [signIn] = authAPI.useSignInMutation();
  const [signUp] = authAPI.useSignUpMutation();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    const user = Object.fromEntries([...data.entries()]);
    try {
      const response = await signIn(user).unwrap();
      dispatch(setUid(response));
      toast.success("Успех!");
      navigate('/profile');
    } catch (error) {
      setError(authErrorTexts[error]);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    const data = new FormData(event.currentTarget);
    const user = Object.fromEntries([...data.entries()]);
    try {
      const response = await signUp(user).unwrap();
      dispatch(setUid(response));
      navigate('/profile');
    } catch (e) {
      setError(authErrorTexts[e.code]);
    }
  };

  const toggleIsSignIn = () => {
    setIsSignIn(prev => !prev);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Войти
            </Typography>
            <Box
              component="form"
              onSubmit={isSignIn ? handleSignIn : handleSignUp}
              sx={{ mt: 1 }}
            >
              {formData.map(each => (
                <React.Fragment key={each.name}>
                  {(isSignIn && !each.isSignIn) || (
                    <TextField
                      margin="normal"
                      required={each.required}
                      fullWidth
                      id={each.name}
                      label={each.label}
                      name={each.name}
                      autoComplete={each.name}
                    />
                  )}
                </React.Fragment>
              ))}
              <Typography color="red" textAlign="center">
                {error && error}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Забыл пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={toggleIsSignIn} variant="body2">
                    {isSignIn ? "Нет аккаунта? Создать аккаунт" : "Есть аккунт? Войти"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
