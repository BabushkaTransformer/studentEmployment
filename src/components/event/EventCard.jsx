import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { getFullName } from '../../utils';

export const EventCard = (data) => {
  const navigate = useNavigate();
  const { author, createdAt, title, id } = data;

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
        <Box>
          <Typography variant="h5" sx={{ pt: 3, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <CardMedia
            onClick={() => navigate(`/event/${id}`)}
            sx={{ py: 2 }}
            component="img"
            height="300"
            image="https://leonardo.osnova.io/51398f01-8352-59c8-bdea-a0874dd7d613/-/preview/700/-/format/webp/"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
