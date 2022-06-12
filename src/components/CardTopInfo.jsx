import React from 'react';
import { getFullName } from '../utils';
import { Avatar, Box, Typography } from '@mui/material';

export const CardTopInfo = ({ user, createdAt }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar src={user?.avatar} sx={{ width: '30px', height: '30px' }}/>
      <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} color="text.primary" gutterBottom>
        {getFullName(user)}
      </Typography>
      <Typography sx={{ fontSize: 14, ml: '30px' }} color="text.secondary" gutterBottom>
        {createdAt}
      </Typography>
    </Box>
  );
};
