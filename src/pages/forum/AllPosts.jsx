import React from 'react';

import { Link } from 'react-router-dom';
import { PostItem } from '../../components/forum/PostItem';
import { PageLoader } from '../../components/ui/PageLoader';
import { Button } from '@mui/material';
import { forumAPI } from '../../store/services/ForumService';
import { POSTS_ROUTE_PATH } from '../../constants';

export const AllPosts = ({ isTab }) => {
  const { data, isLoading } = forumAPI.useGetPostsQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <div>
      {data?.slice(0, isTab ? 3 : data?.length).map(post => (
        <PostItem key={post.id} {...post}/>
      ))}

      {isTab && (
        <Button
          variant="contained"
          component={Link}
          to={POSTS_ROUTE_PATH}
        >
          Посмотреть все
        </Button>
      )}
    </div>
  );
};
