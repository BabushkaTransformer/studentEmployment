import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useDarkMode } from '../../hooks/useDarkMode';

import { serverTimestamp } from 'firebase/firestore';
import { TextEditor } from '../../components/ui/TextEditor';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { vacancyAPI } from '../../store/services/VacancyService';

export const CreateVacancy = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector(state => state.auth);
  const [createVacancy] = vacancyAPI.useCreateVacancyMutation();

  const [vacancy, setVacancy] = React.useState({
    position: "",
    description: "",
    salary: "",
    type: "office",
    phone: user?.phone || ""
  });

  const getValue = (event) => {
    const { name, value } = event.target;
    setVacancy(prev => ({ ...prev, [name]: value }));
  };

  const getEditorValue = (value) => {
    setVacancy({ ...vacancy, description: value });
  };

  const handleCreateVacancy = async (event) => {
    event.preventDefault();
    const author = `${user.lastName || ""} ${user.firstName || ""}`;
    const data = {
      ...vacancy,
      author,
      authorId: user?.id,
      company: user?.company,
      createdAt: serverTimestamp()
    }
    try {
      await createVacancy(data).unwrap();
      toast.success("Создано!");
    } catch (e) {
      toast.success("Произошла ошибка!");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleCreateVacancy}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: '20px',
      }}
    >
      <Box>
        <Box>Должность</Box>
        <TextField
          label="Должность"
          name="position"
          value={vacancy.position}
          onChange={getValue}
          sx={{ width: "50%", background: isDarkMode ? "dark" : "white" }}
        />
      </Box>
      <Box>
        <Box>Оклад</Box>
        <TextField
          label="Оклад"
          name="salary"
          value={vacancy.salary}
          onChange={getValue}
          sx={{ width: "50%", background: isDarkMode ? "dark" : "white" }}
        />
      </Box>
      <Box>
        <Box>Описание</Box>
        <TextEditor
          value={vacancy.description}
          onChange={getEditorValue}
        />
      </Box>

      <Box>
        <Box>Оклад</Box>
        <TextField
          label="Телефон"
          name="phone"
          value={vacancy.phone}
          onChange={getValue}
          sx={{ width: "50%", background: isDarkMode ? "dark" : "white" }}
        />
      </Box>
      <FormControl sx={{ width: "50%", background: isDarkMode ? "dark" : "white" }}>
        <Select
          name="type"
          value={vacancy.type}
          onChange={getValue}
        >
          <MenuItem value="office">Работа в офисе</MenuItem>
          <MenuItem value="internship">Стажировка</MenuItem>
          <MenuItem value="remote">Удаленная работа</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit" sx={{ width: "120px" }}>Создать</Button>
    </Box>
  );
};
