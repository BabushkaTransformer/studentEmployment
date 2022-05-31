import React from 'react';
import { useParams } from 'react-router';
import { useDarkMode } from '../../hooks/useDarkMode';
import { getFullName } from '../../utils';

import { CommentSection } from '../../components/comments/CommentSection';
import Box from '@mui/material/Box';
import { Comment } from '@mui/icons-material';
import { forumAPI } from '../../store/services/ForumService';
import {
  Avatar,
  Typography,
  CircularProgress
} from '@mui/material';

export const PostDetail = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();

  const [commentLength, setCommentLength] = React.useState(0);

  const { data, isLoading } = forumAPI.useGetPostByIdQuery(id);
  const { title, description, user, createdAt } = data || {};

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress/>
      </Box>
    );
  }
  ;

  return (
    <Box>
      <Box
        className="typography-margins"
        sx={{ py: 4, px: 6, background: isDarkMode ? 'dark' : 'white', borderRadius: 2 }}
      >
        <Box className="flex-start" sx={{ gap: 2, mb: 3, mx: 'auto', maxWidth: '900px' }}>
          <Avatar sx={{ width: 30, height: 30 }} src={user?.avatar}/>
          <Typography component="span">{getFullName(user)}</Typography>
          <Typography component="span" sx={{ fontSize: 14 }}>{createdAt}</Typography>
        </Box>
        <Typography sx={{ fontSize: 22, fontWeight: 500, pb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: description || ''
          }}
        />

        <Box className="flex-between" sx={{ gap: 2, mt: 3, mx: 'auto', maxWidth: '900px' }}>
          <Box className="flex-start" gap={2}>
            <Avatar sx={{ width: 38, height: 38 }} src={user?.avatar}/>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography component="span" fontSize={14}>{getFullName(user)}</Typography>
              <Typography component="span" fontSize={14}>{user?.company}</Typography>
            </Box>
          </Box>
          <Box className="flex-start" gap={2}>
            <Comment/>
            <Typography fontWeight={600}>
              {commentLength}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 4, px: 6, background: isDarkMode ? 'dark' : 'white', borderRadius: 2, mt: 5 }}>
        <CommentSection id={id} setCommentLength={setCommentLength}/>
      </Box>
    </Box>
  );
};
