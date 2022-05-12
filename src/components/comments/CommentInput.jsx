import React from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';

export const CommentInput = ({ isLoading, createComment }) => {
  const [comment, setComment] = React.useState("");

  const onEnter = (event) => {
    if (event.keyCode == 13 && !event.shiftKey && comment) {
      event.preventDefault();
      createComment(comment);
      setComment("");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ w: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Box sx={{ w: "100%" }}>
      <TextField
        placeholder="Оставить комментарий"
        value={comment}
        fullWidth
        multiline
        onKeyDown={onEnter}
        minRows={2}
        maxRows={4}
        onChange={(event) => setComment(event.target.value)}
      />
    </Box>
  );
};
