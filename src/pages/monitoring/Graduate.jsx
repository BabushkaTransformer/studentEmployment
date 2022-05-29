import React from 'react';
import { useParams } from 'react-router';
import { useDarkMode } from '../../hooks/useDarkMode';

import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Divider,
  Modal,
  Typography,
  TextField,
  CircularProgress, Select, MenuItem
} from '@mui/material';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { useTranslation } from '../../hooks/useTranslation';
import { toast } from 'react-hot-toast';
import { imageLoaderAPI } from '../../store/services/ImageLoaderService';

const initialValues = {
  abroad: '',
  bySpeciality: '',
  city: '',
  company: '',
  createdAt: '',
  date: '',
  email: '',
  expirationDate: '',
  firstName: '',
  group: '',
  patronymic: '',
  id: '',
  lastName: '',
  phone: '',
  salary: '',
  type: '',
  avatar: '',
  groupName: '',
  description: '',
  unemployed: true
};

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

export const Graduate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const { data, isLoading } = monitoringAPI.useGetStudentByIdQuery(id);

  const [graduate, setGraduate] = React.useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState(null);

  const [loadImage, { isLoading: imageLoading }] = imageLoaderAPI.useLoadImageToServerMutation();
  const [updateGraduate, { isLoading: updateLoading }] = monitoringAPI.useUpdateStudentMutation();

  React.useEffect(() => {
    if (data) {
      setGraduate(data);
    }
  }, [data]);

  const getGraduateData = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    setGraduate(prev => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  const getGraduateAvatar = (event) => {
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
      const response = await loadImage({ file: avatar, place: 'graduates' }).unwrap();
      const newUser = { ...graduate, avatar: response };
      await updateGraduate(newUser).unwrap();

      setGraduate(newUser);
      handleDeleteAvatar();
      toggleModal();
      toast.success(t('notification.save'));
    } catch (error) {
      toast.error(t('notification.error'));
    }
  };

  const handleUpdateGraduate = async (event) => {
    event.preventDefault();
    try {
      await updateGraduate(graduate).unwrap();
      toast.success(t('notification.save'));
    } catch (error) {
      toast.error(t('notification.error'));
    }
  };

  return (
    <Box
      sx={{
        background: isDarkMode ? 'dark' : 'white',
        borderRadius: '10px',
        p: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <Box
        component="form"
        sx={{ mt: 1 }}
        onSubmit={handleUpdateGraduate}
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
              value={graduate.firstName}
              onChange={getGraduateData}
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
              value={graduate.lastName}
              onChange={getGraduateData}
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
              value={graduate.patronymic}
              onChange={getGraduateData}
            />
          </Box>
          <Box className="flex-center" p="50px" width="50%">
            <Box position="relative">
              <Avatar
                alt="avatar"
                src={graduate.avatar || '/static/images/avatar/1.jpg'}
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
          value={graduate.email}
          onChange={getGraduateData}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            id="company"
            label={t('form.company')}
            name="company"
            autoComplete="company"
            value={graduate.company}
            onChange={getGraduateData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            id="salary"
            label={t('form.salary')}
            name="salary"
            autoComplete="salary"
            value={graduate.salary}
            onChange={getGraduateData}
          />
        </Box>
        <Typography variant="h5" mt={4} mb={2}>
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
          value={graduate.phone}
          onChange={getGraduateData}
        />
        <Typography variant="h5" mt={4} mb={2}>
          О выпускнике
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          id="description"
          multiline
          rows={4}
          placeholder="Описание выпускника"
          name="description"
          autoComplete="description"
          value={graduate.description}
          onChange={getGraduateData}
        />
        <Box  sx={{ display: 'flex', gap: 2, my: 4 }}>
          <Select
            name="type"
            value={graduate.type}
            onChange={getGraduateData}
          >
            <MenuItem value='office'>Офис</MenuItem>
            <MenuItem value='remote'>Удаленка</MenuItem>
          </Select>

          <Select
            name="abroad"
            value={graduate.abroad}
            onChange={getGraduateData}
          >
            <MenuItem value='yes'>За границей</MenuItem>
            <MenuItem value='no'>В Кыргызстане</MenuItem>
          </Select>

          <Select
            name="bySpeciality"
            value={graduate.bySpeciality}
            onChange={getGraduateData}
          >
            <MenuItem value='yes'>По специальности</MenuItem>
            <MenuItem value='no'>Не по специальности</MenuItem>
          </Select>
        </Box>
        <Divider/>
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
        open={isLoading || imageLoading || updateLoading}
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
                  onChange={(e) => getGraduateAvatar(e)}
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
