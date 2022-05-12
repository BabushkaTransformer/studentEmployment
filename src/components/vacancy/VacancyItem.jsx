import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { VACANCY_ROUTE_PATH } from '../../constants';

export const VacancyItem = ({
  id,
  position,
  salary,
  type
}) => {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`${VACANCY_ROUTE_PATH}/${id}`);
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 20, mb: 2, cursor: "pointer" }}
          onClick={navigateToDetail}
        >
          {position}
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography color="blue" mb={2}>
          {salary}
        </Typography>
        <Typography>
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
};
