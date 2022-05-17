import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { TextEditor } from '../../components/ui/TextEditor';
import { Box, Button, TextField } from '@mui/material';
import { eventAPI } from '../../store/services/EventService';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { imageLoaderAPI } from '../../store/services/ImageLoaderService';

export const CreateEvent = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [createEvent] = eventAPI.useCreateEventMutation();

  const [imageUpload] = imageLoaderAPI.useLoadImageToServerMutation();

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    const author = `${user.lastName || ''} ${user.firstName || ''}`;
    const data = {
      title,
      description,
      createdAt: serverTimestamp(),
      author,
      authorId: user.id,
    };

    try {
      await createEvent(data);
      toast.success('Создано!');
    } catch (error) {
      toast.error('Что то пошло не так');
    }
  }

  const uploadImage = async (event) => {
    if (event.target.files[0]) {
      try {
        const res = await imageUpload(event.target.files[0]);
        console.log(res);
      } catch (error) {
        console.log(error)
      }
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
        <TextEditor
          onChange={setDescription}
        />
      </Box>
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          onChange={uploadImage}
          hidden
        />
      </Button>
      <Button
        variant="contained"
        type="submit"
        sx={{ width: '120px' }}
        onClick={handleCreateEvent}
      >Создать</Button>
    </Box>
  );
};
