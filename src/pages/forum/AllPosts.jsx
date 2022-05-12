import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import { forumAPI } from '../../store/services/ForumService';
import { PostItem } from '../../components/forum/PostItem';

export const AllPosts = () => {
  const { data, isLoading } = forumAPI.useGetPostsQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <div>
      {data?.map(post => (
        <PostItem key={post.id} {...post}/>
      ))}
    </div>
  );
};
