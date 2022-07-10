import React from 'react';

import { Link } from 'react-router-dom';
import { PostItem } from '../../components/forum/PostItem';
import { PageLoader } from '../../components/ui/PageLoader';
import { Button, Typography } from '@mui/material';
import { forumAPI } from '../../store/services/ForumService';
import { EVENT_ROUTE_PATH } from '../../constants';

export const AllPosts = ({ isTab }) => {
  const { data, isLoading } = forumAPI.useGetPostsQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <div>
      {data?.length ? (
        data?.slice(0, isTab ? 3 : data?.length).map(event => (
          <PostItem key={event.id} {...event} />
        ))
      ) : (
        <Typography>
          Пока что нет постов
        </Typography>
      )}

      {(isTab && !!data?.length) && (
        <Button
          variant="contained"
          component={Link}
          to={EVENT_ROUTE_PATH}
        >
          Посмотреть все
        </Button>
      )}
    </div>
  );
};
