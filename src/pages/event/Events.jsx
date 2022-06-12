import React from 'react';

import { Link } from 'react-router-dom';
import { PageLoader } from '../../components/ui/PageLoader';
import { EventCard } from '../../components/event/EventCard';
import { Box, Button } from '@mui/material';
import { eventAPI } from '../../store/services/EventService';
import { EVENT_ROUTE_PATH } from '../../constants';

export const Events = ({ isTab }) => {
  const { data, isLoading } = eventAPI.useGetEventsQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: 2
    }}>
      {data?.slice(0, isTab ? 3 : data?.length).map(event => (
        <EventCard key={event.id} {...event} />
      ))}

      {isTab && (
        <Button
          variant="contained"
          component={Link}
          to={EVENT_ROUTE_PATH}
        >
          Посмотреть все
        </Button>
      )}
    </Box>
  );
};
