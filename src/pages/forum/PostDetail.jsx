import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { forumAPI } from '../../store/services/ForumService';
import { CommentSection } from '../../components/comments/CommentSection';
import { useDarkMode } from '../../hooks/useDarkMode';

export const PostDetail = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const { data, isLoading } = forumAPI.useGetPostByIdQuery(id);

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
  };

  return (
    <Box>
      <Box sx={{ p: 6, background: isDarkMode ? "dark" : "white", borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom>
          {data?.title}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: data?.description || ""
          }}
        />
      </Box>

      <Box sx={{ p: 6, background: isDarkMode ? "dark" : "white", borderRadius: 2, mt: 5 }}>
        <CommentSection id={id}/>
      </Box>
    </Box>
  );
};
