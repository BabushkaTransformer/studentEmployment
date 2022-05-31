import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useDarkMode } from '../../hooks/useDarkMode';

import { serverTimestamp } from 'firebase/firestore';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { vacancyAPI } from '../../store/services/VacancyService';
import SunEditor, { buttonList } from 'suneditor-react';
import { useNavigate } from 'react-router';
import { VACANCY_ROUTE_PATH } from '../../constants';

export const CreateVacancy = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const { user } = useSelector(state => state.auth);
  const [createVacancy] = vacancyAPI.useCreateVacancyMutation();

  const [vacancy, setVacancy] = React.useState({
    position: '',
    description: '',
    salary: '',
    type: 'office',
    shortDescription: '',
    phone: user?.phone || '',
    city: user?.city || ''
  });

  const getValue = (event) => {
    const { name, value } = event.target;
    setVacancy(prev => ({ ...prev, [name]: value }));
  };

  const getEditorValue = (value) => {
    setVacancy(prev => ({ ...prev, description: value }));
  };

  const handleCreateVacancy = async (event) => {
    event.preventDefault();
    const author = `${user.lastName || ''} ${user.firstName || ''}`;
    const data = {
      ...vacancy,
      author,
      authorId: user?.id,
      company: user?.company,
      createdAt: serverTimestamp()
    };
    try {
      await createVacancy(data).unwrap();
      toast.success('Создано!');
      navigate(VACANCY_ROUTE_PATH);
    } catch (e) {
      toast.success('Произошла ошибка!');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleCreateVacancy}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box width="70%">
          <Box mb={1}>Должность</Box>
          <TextField
            fullWidth
            label="Должность"
            name="position"
            value={vacancy.position}
            onChange={getValue}
            sx={{ background: isDarkMode ? 'dark' : 'white' }}
          />
        </Box>
        <Box width="30%">
          <Box mb={1}>Оклад</Box>
          <TextField
            fullWidth
            label="Оклад"
            name="salary"
            value={vacancy.salary}
            onChange={getValue}
            sx={{ background: isDarkMode ? 'dark' : 'white' }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Телефон"
          name="phone"
          value={vacancy.phone}
          onChange={getValue}
          sx={{ background: isDarkMode ? 'dark' : 'white' }}
        />
        <TextField
          fullWidth
          label="Город"
          name="city"
          value={vacancy.city}
          onChange={getValue}
          sx={{ background: isDarkMode ? 'dark' : 'white' }}
        />
      </Box>
      <FormControl sx={{ background: isDarkMode ? 'dark' : 'white' }}>
        <Select
          fullWidth
          name="type"
          value={vacancy.type}
          onChange={getValue}
        >
          <MenuItem value="office">Работа в офисе</MenuItem>
          <MenuItem value="internship">Стажировка</MenuItem>
          <MenuItem value="remote">Удаленная работа</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Краткое описание"
        name="shortDescription"
        multiline
        rows={2}
        value={vacancy.shortDescription}
        onChange={getValue}
        sx={{ background: isDarkMode ? 'dark' : 'white' }}
      />
      <Box>
        <Box>Описание</Box>
        <SunEditor
          height="300px"
          setContents={vacancy.description}
          onChange={getEditorValue}
          setOptions={{ buttonList: buttonList.complex }}
        />
      </Box>


      <Button variant="contained" type="submit" sx={{ width: '120px' }}>Создать</Button>
    </Box>
  );
};
