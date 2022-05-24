import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Box, Button, TextField } from '@mui/material';
import { eventAPI } from '../../store/services/EventService';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'

export const CreateEvent = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [createEvent] = eventAPI.useCreateEventMutation();

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      createdAt: serverTimestamp(),
      author: user,
    };

    try {
      await createEvent(data);
      toast.success('Создано!');
    } catch (error) {
      toast.error('Что то пошло не так');
    }
  }

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
          setContents={"<p>Ваш текст</p>"}
          onChange={setDescription}
          setOptions={{ buttonList: buttonList.complex}}
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
