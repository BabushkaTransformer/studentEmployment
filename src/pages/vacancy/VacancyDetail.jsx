import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useParams } from 'react-router';

import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { vacancyAPI } from '../../store/services/VacancyService';

export const VacancyDetail = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const { data, isLoading } = vacancyAPI.useGetVacancyByIdQuery(id);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 6, background: isDarkMode ? 'dark' : 'white', borderRadius: 2 }}>
      <Typography variant="h3" gutterBottom>
        {data?.position}
      </Typography>
      <Box mb="20px">
        <Box component="span">
          Оклад
        </Box>
        <Typography variant="h5">
          {data?.salary}
        </Typography>
      </Box>
      <Box>
        <Box component="span">
          Компания
        </Box>
        <Typography variant="h5">
          {data?.company}
        </Typography>
      </Box>

      <Box mt="40px">
        <Box component="span">
          Описание
        </Box>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: data?.description || ''
          }}
        />
      </Box>

      <Box mt="20px">
        <Box component="span">
          Телефон
        </Box>
        <Typography variant="h6">
          {data?.phone}
        </Typography>
      </Box>
    </Box>
  );
};
