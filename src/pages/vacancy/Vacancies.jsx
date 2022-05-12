import React from 'react';
import { VacancyItem } from '../../components/vacancy/VacancyItem';
import { vacancyAPI } from '../../store/services/VacancyService';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export const Vacancies = () => {
  const { data, isLoading } = vacancyAPI.useGetVacanciesQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <div>
      {data?.map(vacancy => (
        <VacancyItem key={vacancy.id} {...vacancy}/>
      ))}
    </div>
  );
};
