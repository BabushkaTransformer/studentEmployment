import React from 'react';

import { Link } from 'react-router-dom';
import { VacancyItem } from '../../components/vacancy/VacancyItem';
import { PageLoader } from '../../components/ui/PageLoader';
import { vacancyAPI } from '../../store/services/VacancyService';
import { Button, Typography } from '@mui/material';
import { EVENT_ROUTE_PATH } from '../../constants';

export const Vacancies = ({ isTab }) => {
  const { data, isLoading } = vacancyAPI.useGetVacanciesQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <div>
      {data?.length ? (
        data?.slice(0, isTab ? 3 : data?.length).map(event => (
          <VacancyItem key={event.id} {...event} />
        ))
      ) : (
        <Typography>
          Пока что нет вакансий
        </Typography>
      )}

      {(isTab && !!data?.length) && (
        <Button
          variant="contained"
          component={Link}
          to={EVENT_ROUTE_PATH}
        >
          Посмотреть все
        </Button>
      )}
    </div>
  );
};
