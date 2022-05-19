import React from 'react';
import { authAPI } from '../store/services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useTranslation } from '../hooks/useTranslation';

import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { useDarkMode } from '../hooks/useDarkMode';
import { imageLoaderAPI } from '../store/services/ImageLoaderService';
import { setUserProperty } from '../store/slices/AuthSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export const Profile = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const { uid } = useSelector(state => state.auth);
  const { t } = useTranslation();

  const { data, isLoading } = authAPI.useGetUserProfileQuery(uid, { skip: !uid });
  const [updateProfile, { isLoading: updateLoading }] = authAPI.useUpdateUserProfileMutation();
  const [loadImage, { isLoading: imageLoading }] = imageLoaderAPI.useLoadImageToServerMutation();

  const [avatar, setAvatar] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({
    telegram: '',
    company: '',
    email: '',
    phone: '',
    avatar: '',
    lastName: '',
    patronymic: '',
    firstName: ''
  });

  React.useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  const getUserAvatar = (event) => {
    if (event.target.files[0]) {
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      setAvatar(event.target.files[0]);
      setAvatarPreview(objectUrl);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(null);
    setAvatarPreview('');
  };

  const handleLoadAvatar = async () => {
    try {
      const response = await loadImage({ file: avatar, place: 'avatar' }).unwrap();
      const newUser = { ...profile, avatar: response };
      await updateProfile(newUser).unwrap();

      setProfile(newUser);
      dispatch(setUserProperty(newUser));
      handleDeleteAvatar();
      toggleModal();
      toast.success(t('notification.save'));
    } catch (error) {
      toast.error(t('notification.error'));
    }
  };

  const getProfileData = (event) => {
    const { name, value } = event.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(profile).unwrap();
      toast.success(t('notification.save'));
    } catch (error) {
      toast.error(t('notification.error'));
    }
  };


  const toggleModal = () => {
    setOpen(prev => !prev);
  }

  return (
    <Box
      sx={{
        background: isDarkMode ? 'dark' : 'white',
        borderRadius: '10px',
        p: '20px'
      }}
    >
      <Box
        component="form"
        onSubmit={handleUpdateProfile}
        sx={{ mt: 1 }}
      >
        <Box display="flex">
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="firstName"
              label={t('form.name')}
              name="firstName"
              autoComplete="firstName"
              value={profile.firstName}
              onChange={getProfileData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="lastName"
              label={t('form.surname')}
              name="lastName"
              autoComplete="lastName"
              value={profile.lastName}
              onChange={getProfileData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="patronymic"
              label={t('form.patronymic')}
              name="patronymic"
              autoComplete="patronymic"
              value={profile.patronymic}
              onChange={getProfileData}
            />
          </Box>
          <Box className="flex-center" p="50px" width="50%">
            <Box position="relative">
              <Avatar
                alt="avatar"
                src={profile.avatar || "/static/images/avatar/1.jpg"}
                sx={{ width: '160px', height: '160px' }}
              />
              <Box
                className="flex-center"
                sx={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  bgcolor: 'silver',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={toggleModal}
              >
                +
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider/>
        <TextField
          margin="normal"
          required
          fullWidth
          variant="standard"
          id="email"
          label={t('form.email')}
          name="email"
          autoComplete="email"
          value={profile.email}
          onChange={getProfileData}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          variant="standard"
          id="company"
          label={t('form.company')}
          name="company"
          autoComplete="company"
          value={profile.company}
          onChange={getProfileData}
        />
        <Typography variant="h5" mt={4}>
          Контакты
        </Typography>
        <TextField
          required
          fullWidth
          variant="standard"
          id="phone"
          label={t('form.phone')}
          name="phone"
          autoComplete="phone"
          value={profile.phone}
          onChange={getProfileData}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
          >
            {t('common.save')}
          </Button>
        </Box>
      </Box>
      <Backdrop
        open={isLoading || updateLoading || imageLoading}
        sx={{ color: '#fff', zIndex: '99999' }}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Modal
        open={open}
        onClose={toggleModal}
      >
        <Box sx={style}>
          <Box>
            {avatarPreview ? (
              <Box>
                <Avatar src={avatarPreview} sx={{ width: '200px', height: '200px' }}/>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleLoadAvatar}
                  >
                    {t('common.load')}
                  </Button>
                  <Button onClick={handleDeleteAvatar}>
                    {t('common.delete')}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Button
                variant="contained"
                component="label"
              >
                {t('button.avatar')}
                <input
                  type="file"
                  onChange={(e) => getUserAvatar(e)}
                  hidden
                />
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
