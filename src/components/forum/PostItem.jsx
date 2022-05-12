import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const PostItem = ({
  id,
  title,
  description,
  categories,
  author,
  createdAt
}) => {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/post/${id}`);
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 1 }}>
          <Box component="span" sx={{ fontWeight: "bold" }}>{author}</Box>
          <Box component="span" sx={{ fontSize: "sm" }}>{createdAt}</Box>
        </Box>
        <Typography
          sx={{ fontSize: 20, mb: 2, cursor: "pointer" }}
          onClick={navigateToDetail}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: description || ""
          }}
        />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {categories.map(category => (
            <Chip
              key={category.id}
              label={category.title}
              color="secondary"
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
};
