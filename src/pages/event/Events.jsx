import React from 'react';
import { PageLoader } from '../../components/ui/PageLoader';
import { EventCard } from '../../components/event/EventCard';
import { eventAPI } from '../../store/services/EventService';

export const Events = () => {
  const { data, isLoading } = eventAPI.useGetEventsQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <div>
      {data?.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
