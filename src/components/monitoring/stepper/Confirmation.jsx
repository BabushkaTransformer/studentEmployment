import React from 'react';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { useTranslation } from '../../../hooks/useTranslation';

import { Box, Button } from '@mui/material';
import { monitoringAPI } from '../../../store/services/MonitoringService';

const convertText = {
  'no': 'Нет',
  'yes': 'Да'
};

const convertType = {
  'office': 'Офис',
  'remote': 'Удаленно'
}

export const Confirmation = ({ personalInfo, employmentInfo, onClose, setIsFinish, group, resetState }) => {
  const { t } = useTranslation();
  const [personalValues, setPersonalValues] = React.useState([]);
  const [employmentValues, setEmploymentValues] = React.useState([]);

  const [createStudent] = monitoringAPI.useCreateStudentMutation();

  React.useEffect(() => {
    const result = Object.keys(personalInfo).reduce((acc, el) => {
      return { ...acc, [el]: personalInfo[el].value };
    }, {});
    const result1 = Object.keys(employmentInfo).reduce((acc, el) => {
      return { ...acc, [el]: employmentInfo[el].value };
    }, {});

    setPersonalValues(result);
    setEmploymentValues(result1);
  }, [personalInfo, employmentInfo]);

  const handleCreateStudent = async () => {
    const data = {
      ...personalValues,
      ...employmentValues,
      expirationDate: group.expirationDate,
      groupName: group.title,
      group: group.id,
      description: '',
      avatar: '',
      createdAt: serverTimestamp()
    };

    try {
      await createStudent(data);
      toast.success('Создано!');
      resetState();
      onClose && onClose();
      setIsFinish && setIsFinish(true);
    } catch (error) {
      toast.error('Что то пошло не так');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Имя</Box>
        <Box>{personalValues.firstName}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Фамилия</Box>
        <Box>{personalValues.lastName}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Email</Box>
        <Box>{personalValues.email}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Компания</Box>
        <Box>{employmentValues.company}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Зарплата</Box>
        <Box>{employmentValues.salary}c.</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>За границей</Box>
        <Box>{convertText[employmentValues.abroad]}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>Тип работы</Box>
        <Box>{convertType[employmentValues.type]}</Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver' }}>
        <Box>По спецу</Box>
        <Box>{convertText[employmentValues.bySpeciality]}</Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateStudent}
      >
        {t('common.create')}
      </Button>
    </Box>
  );
};
