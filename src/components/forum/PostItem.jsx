import React from 'react';
import { useNavigate } from 'react-router';
import { getFullName } from '../../utils';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography
} from '@mui/material';
import { CardTopInfo } from '../CardTopInfo';

export const PostItem = ({
  id,
  title,
  description,
  categories,
  user,
  createdAt
}) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
      <CardContent>
        <CardTopInfo user={user} createdAt={createdAt}/>
        <Typography
          sx={{ fontSize: 20, mb: 2, cursor: 'pointer', mt: 2 }}
          onClick={navigateToDetail}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="wrap-3 card-reset"
          dangerouslySetInnerHTML={{
            __html: description || ''
          }}
        />
        <Box className="flex-between" mt={2}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {categories.map(category => (
              <Chip
                key={category.id}
                label={category.title}
                color="primary"
              />
            ))}
          </Box>
          <Button onClick={navigateToDetail}>Подробнее</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
