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
}) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/group/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: '500' }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateTo}>Подробнее</Button>
      </CardActions>
    </Card>
  );
};
