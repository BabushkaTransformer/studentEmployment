import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { getFullName } from '../../utils';

export const EventCard = (data) => {
  const navigate = useNavigate();
  const { author, createdAt, title, id, description } = data;

  const navigateToEventDetail = () => {
    navigate(`/event/${id}`);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Avatar src={author.avatar}/>
          <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} color="text.primary" gutterBottom>
            {getFullName(author)}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {createdAt}
          </Typography>
        </Box>
        <Box onClick={navigateToEventDetail} sx={{ cursor: 'pointer' }}>
          <Typography variant="h5" sx={{ pt: 3, fontWeight: 'bold' }} gutterBottom>
            {title}
          </Typography>
          <Typography
            className="wrap-3 card-reset"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
