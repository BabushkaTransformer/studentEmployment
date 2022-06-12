import React from 'react';

import { Link } from 'react-router-dom';
import { VacancyItem } from '../../components/vacancy/VacancyItem';
import { PageLoader } from '../../components/ui/PageLoader';
import { vacancyAPI } from '../../store/services/VacancyService';
import { Button } from '@mui/material';
import { VACANCY_ROUTE_PATH } from '../../constants';

export const Vacancies = ({ isTab }) => {
  const { data, isLoading } = vacancyAPI.useGetVacanciesQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <div>
      {data?.slice(0, isTab ? 4 : data?.length).map(vacancy => (
        <VacancyItem key={vacancy.id} {...vacancy}/>
      ))}

      {isTab && (
        <Button
          variant="contained"
          component={Link}
          to={VACANCY_ROUTE_PATH}
        >
          Посмотреть все
        </Button>
      )}
    </div>
  );
};
