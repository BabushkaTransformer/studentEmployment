import React from 'react';
import { useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';

export const GroupCard = ({
  id,
  title,
  description = 'Описание'
}) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/group/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateTo}>Learn More</Button>
      </CardActions>
    </Card>
  );
};
