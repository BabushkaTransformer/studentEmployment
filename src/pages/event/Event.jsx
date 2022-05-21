import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { eventAPI } from '../../store/services/EventService';
import { PageLoader } from '../../components/ui/PageLoader';
import { useDarkMode } from '../../hooks/useDarkMode';
import { getFullName } from '../../utils';

export const Event = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const { data, isLoading } = eventAPI.useGetEventByIdQuery(id);
  const { title, description, author, createdAt } = data || {};

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <Box sx={{ background: isDarkMode ? 'dark' : 'white', borderRadius: '10px', p: 5 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Avatar src={author?.avatar}/>
        <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} color="text.primary" gutterBottom>
          {getFullName(author)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {createdAt}
        </Typography>
      </Box>
      <Typography component="h1" sx={{ fontWeight: 'bold', fontSize: '28px' }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: description || ''
        }}
      />
    </Box>
  );
};
