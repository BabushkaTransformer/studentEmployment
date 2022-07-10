import React from 'react';
import { useNavigate } from 'react-router';
import { useDarkMode } from '../../hooks/useDarkMode';
import { getFullName } from '../../utils';

import {
  Avatar,
  Box,
  Divider,
  Toolbar,
  Typography,
  Drawer,
  CircularProgress
} from '@mui/material';
import { forumAPI } from '../../store/services/ForumService';
import { eventAPI } from '../../store/services/EventService';
import { ArrowForwardIos } from '@mui/icons-material';

export const RightSidebar = () => {
  const { isDarkMode } = useDarkMode();

  const { data: comments, isLoading: commentLoading } = forumAPI.useGetCommentsQuery();
  const { data: events, isLoading: eventsLoading } = eventAPI.useGetEventsQuery();

  return (
    <Drawer
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          borderWidth: 0,
          background: isDarkMode ? 'dark' : '#f5f5f5',
          boxSizing: 'border-box',
          px: 2
        }
      }}
      className="no-scroll"
      variant="permanent"
      anchor="right"
    >
      <Toolbar/>
      <Box my={5}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Последние посты <ArrowForwardIos style={{ fontSize: '14px' }}/>
        </Typography>
        {commentLoading && (
          <div className="flex-center">
            <CircularProgress/>
          </div>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {events?.length ? (
            events?.slice(0, 5).map(event => (
              <EventCard key={event.id} {...event}/>
            ))
          ) : (
            <Typography>Нет постов</Typography>
          )}
        </Box>
      </Box>

      <Divider/>

      <Box mt={5}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Последние комментарии <ArrowForwardIos style={{ fontSize: '14px' }}/>
        </Typography>
        {eventsLoading && (
          <div className="flex-center">
            <CircularProgress/>
          </div>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {comments?.length ? (
            comments?.slice(0, 10).map(comment => (
              <CommentItem key={comment.id} {...comment}/>
            ))
          ) : (
            <Typography>Нет комментариев</Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

const CommentItem = ({ user, postId, postTitle, text }) => {
  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <Box>
      <Box className="flex-start" gap={1}>
        <Avatar src={user.avatar} sx={{ width: 25, height: 25 }}/>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{getFullName(user)}</Typography>
      </Box>
      <Box onClick={navigateToPost} sx={{ cursor: 'pointer' }}>
        <Typography className="wrap-3">{text}</Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
          {postTitle}
        </Typography>
      </Box>
    </Box>
  );
};

const EventCard = ({ title, createdAt, author, id }) => {
  const navigate = useNavigate();

  const navigateToEvent = () => {
    navigate(`/event/${id}`);
  };

  return (
    <Box
      onClick={navigateToEvent}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, cursor: 'pointer' }}
    >
      <Typography className="wrap-3" fontWeight={500}>{title}</Typography>
      <Box className="flex-start" gap={1} fontSize={13}>
        <Typography fontWeight={700}>{getFullName(author)}</Typography>
        <div>{createdAt}</div>
      </Box>
    </Box>
  );
};