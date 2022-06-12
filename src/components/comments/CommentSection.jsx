import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { CommentItem } from './CommentItem';
import { CommentInput } from './CommentInput';
import { serverTimestamp } from 'firebase/firestore';
import { Box, CircularProgress } from '@mui/material';
import { forumAPI } from '../../store/services/ForumService';

export const CommentSection = ({ id, setCommentLength, postTitle }) => {
  const { user } = useSelector(state => state.auth);
  const [createComment, { isLoading: createLoading }] = forumAPI.useCreateCommentMutation();
  const { data, isLoading } = forumAPI.useGetCommentsQuery(id);

  const handleCreateComment = async (comment) => {
    const data = {
      user,
      postTitle,
      text: comment,
      postId: id,
      createdAt: serverTimestamp()
    }
    try {
      await createComment(data).unwrap();
    } catch (error) {
      toast.error('Что-то пошло не так');
    }
  };

  React.useEffect(() => {
    data && setCommentLength(data.length);
  }, [data]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress/>
      </Box>
    )
  }

  if (!data?.length) {
    return (
      <div>
        <CommentInput
          isLoading={isLoading || createLoading}
          createComment={handleCreateComment}
        />
        Увы, тут нет комментариев( Будьте первыми!
      </div>
    )
  }

  return (
    <div>
      <CommentInput
        isLoading={isLoading || createLoading}
        createComment={handleCreateComment}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {data.map(comment => (
          <CommentItem key={comment.id} {...comment}/>
        ))}
      </Box>
    </div>
  );
};
