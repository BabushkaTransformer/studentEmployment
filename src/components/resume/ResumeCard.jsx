import React from 'react';
import { useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import { RESUME_ROUTE_PATH } from '../../constants';

export const ResumeCard = (data) => {
  const navigate = useNavigate();
  const { position, city, additional, id } = data;

  return (
    <Card sx={{ widths: '100%' }}>
      <CardContent>
        <Typography
          className={'MuiTypography--heading'}
          variant={'h6'}
          gutterBottom
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`${RESUME_ROUTE_PATH}/${id}`)}
        >
          {position}
        </Typography>
        <Typography
          className={'MuiTypography--subheading'}
          variant={'caption'}
        >
          {city}
        </Typography>
        <Stack direction="row" gap={1} mt={4}>
          {additional?.skills.map((skill, i) => (
            <Chip key={i} label={skill}/>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
