import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { VACANCY_ROUTE_PATH } from '../../constants';

export const VacancyItem = (props) => {
  const {
    id,
    position,
    salary,
    city,
    company,
    shortDescription
  } = props;
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`${VACANCY_ROUTE_PATH}/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, fontWeight: 500, cursor: 'pointer', color: 'blue' }}
          onClick={navigateToDetail}
        >
          {position}
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 500, mb: 2 }}>
          {salary}
        </Typography>
        <Box mb={2}>
          <Typography sx={{ fontSize: 14 }}>
            {company}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {city}
          </Typography>
        </Box>
        <Typography>
          {shortDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={navigateToDetail}
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
