import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { PostItem } from '../components/forum/PostItem';
import { VacancyItem } from '../components/vacancy/VacancyItem';
import { EventCard } from '../components/event/EventCard';
import { Box, CircularProgress, Typography } from '@mui/material';
import { forumAPI } from '../store/services/ForumService';
import { vacancyAPI } from '../store/services/VacancyService';
import { eventAPI } from '../store/services/EventService';

export const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const { data: events, isLoading: eventsLoading } = eventAPI.useGetEventsQuery();
  const { data: posts, isLoading: postsLoading } = forumAPI.useGetPostsQuery();
  const { data: vacancies, isLoading: vacanciesLoading } = vacancyAPI.useGetVacanciesQuery();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SearchingBlock
        data={events}
        title="Мероприятия"
        CardComponent={EventCard}
        isLoading={eventsLoading}
        searchValue={title}
      />
      <SearchingBlock
        data={vacancies}
        title="Вакансии"
        value="position"
        CardComponent={VacancyItem}
        isLoading={postsLoading}
        searchValue={title}
      />
      <SearchingBlock
        data={posts}
        title="Посты"
        CardComponent={PostItem}
        isLoading={vacanciesLoading}
        searchValue={title}
      />
    </Box>
  );
};

const SearchingBlock = ({
  data,
  isLoading,
  title,
  searchValue,
  CardComponent,
  value = 'title'
}) => {
  return (
    <>
      <Typography variant="h4" mt={2}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data?.filter(el => el[value]?.toLowerCase().includes(searchValue.toLowerCase()))?.length ? (
          data.filter(el => el[value]?.toLowerCase().includes(searchValue.toLowerCase())).map(event => (
            <CardComponent key={event.id} {...event}/>
          ))
        ) : (
          <Typography>
            {isLoading ? <CircularProgress/> : 'Нет совпадений'}
          </Typography>
        )}
      </Box>
    </>
  );
};
