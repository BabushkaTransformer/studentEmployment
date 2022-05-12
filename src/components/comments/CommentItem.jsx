import React from 'react';
import { Avatar, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Delete, Edit } from '@mui/icons-material';
import { forumAPI } from '../../store/services/ForumService';
import { toast } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';

export const CommentItem = ({ id, text, user, createdAt }) => {
  const { isDarkMode } = useDarkMode();
  const [isEdit, setIsEdit] = React.useState(false);
  const [comment, setComment] = React.useState(text || '');
  const author = `${user.lastName || ''} ${user.firstName || ''}`;

  const [updateComment, { isLoading: updateLoading }] = forumAPI.useUpdateCommentMutation();
  const [deleteComment, { isLoading: deleteLoading }] = forumAPI.useDeleteCommentMutation();

  const toggleIsEdit = () => {
    setIsEdit(prev => !prev);
  };

  const handleEditComment = async () => {
    const data = {
      text: comment,
      id
    };
    try {
      await updateComment(data).unwrap();
      toast.success("Комментарий изменен!");
      setIsEdit(false);
    } catch (error) {
      toast.error("Что то пошло не так");
      setComment(text);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(id).unwrap();
      toast.success("Комментарий удален!");
    } catch (error) {
      toast.error("Что то пошло не так");
    }
  }


  return (
    <Grid
      container
      wrap="nowrap"
      bgcolor={isDarkMode ? "#424242" : "#e8f5e9"}
      borderRadius={1}
      position="relative"
    >
      <Box
        onClick={toggleIsEdit}
        sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
      >
        <Edit fontSize="20px"/>
      </Box>
      <Grid item padding={2}>
        <Avatar alt="Remy Sharp" src="" />
      </Grid>
      <Grid justifyContent="left" pt={2} item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{author}</h4>
        {isEdit ? (
          <Box sx={{ pt: 4, pr: 2, pb: 2 }}>
            <TextField
              label="Редактирование комментария"
              placeholder="Ваш комментарий"
              fullWidth
              value={comment}
              onChange={event => setComment(event.target.value)}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <IconButton
                onClick={handleDeleteComment}
                size="small"
              >
                {deleteLoading ? <CircularProgress/> : <Delete/>}
              </IconButton>
              <Box>
                <Button
                  variant="container"
                  onClick={toggleIsEdit}
                >
                  Отмена
                </Button>
                <LoadingButton
                  loading={updateLoading}
                  onClick={handleEditComment}
                >
                  Сохранить
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <p style={{ textAlign: "left" }}>
              {comment}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {createdAt}
            </p>
          </>
        )}
      </Grid>
    </Grid>
  );
};
