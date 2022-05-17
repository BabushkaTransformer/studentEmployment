import React from 'react';
import { VacancyItem } from '../../components/vacancy/VacancyItem';
import { PageLoader } from '../../components/ui/PageLoader';
import { vacancyAPI } from '../../store/services/VacancyService';

export const Vacancies = () => {
  const { data, isLoading } = vacancyAPI.useGetVacanciesQuery();

  if (isLoading) {
    return (
      <PageLoader/>
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
