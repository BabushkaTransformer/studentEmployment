import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router';

export const EventCard = (data) => {
  const navigate = useNavigate();
  const { author, createdAt, description, id } = data;
  return (
    <Card>
      <CardContent sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} color="text.primary" gutterBottom>
            {author}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {createdAt}
          </Typography>
        </Box>
        <Box>
          <CardMedia
            onClick={() => navigate(`/event/${id}`)}
            sx={{ py: 2 }}
            component="img"
            height="300"
            image="https://leonardo.osnova.io/51398f01-8352-59c8-bdea-a0874dd7d613/-/preview/700/-/format/webp/"
          />
        </Box>
        <Typography
          variant="body1"
          sx={{ maxHeight: '80px', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{
            __html: description || ''
          }}
        />
      </CardContent>
    </Card>
  );
};
