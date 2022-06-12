import React from 'react';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';

import { Box, Button, TextField } from '@mui/material';
import SunEditor, { buttonList } from 'suneditor-react';
import { eventAPI } from '../../store/services/EventService';
import { imageLoaderAPI } from '../../store/services/ImageLoaderService';
import { EVENT_ROUTE_PATH } from '../../constants';
import 'suneditor/dist/css/suneditor.min.css';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');

  const [createEvent] = eventAPI.useCreateEventMutation();
  const [uploadImage] = imageLoaderAPI.useLoadImageToServerMutation();

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      image,
      createdAt: serverTimestamp(),
      author: user
    };

    try {
      await createEvent(data);
      toast.success('Создано!');
      navigate(EVENT_ROUTE_PATH);
    } catch (error) {
      toast.error('Что то пошло не так');
    }
  };

  const handleUploadImage = async (event) => {
    if (!event.target.files[0]) return;

    try {
      const { data } = await uploadImage({ file: event.target.files[0], place: 'event' });
      setImage(data);
      toast.success('Изображение загружено!');
    } catch (error) {
      toast.error('Не удалось загрузить изображение!');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Box>
        <Box>Название поста</Box>
        <TextField
          label="Название поста"
          name="title"
          fullWidth
          sx={{ background: isDarkMode ? 'dark' : 'white' }}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>
      <Box>
        <Box>Описание</Box>
        <SunEditor
          height="300px"
          setContents={'<p>Ваш текст</p>'}
          onChange={setDescription}
          setOptions={{ buttonList: buttonList.complex }}
        />
      </Box>
      <Button
        variant="contained"
        type="submit"
        sx={{ width: '120px' }}
        onClick={handleCreateEvent}
      >Создать</Button>
    </Box>
  );
};
