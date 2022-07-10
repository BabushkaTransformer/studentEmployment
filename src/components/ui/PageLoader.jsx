import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export const PageLoader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress/>
    </Box>
  );
};
