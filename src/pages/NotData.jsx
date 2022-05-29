import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import noDataImage from '../assets/images/not-data.webp';

export const NotData = ({
  title = 'Нет результатов',
  subtitle,
}) => {
  return (
    <Box className="flex-center" flexDirection="column">
      <Box
        component="img"
        sx={{
          aspectRatio: '1/1',
          width: 350
        }}
        src={noDataImage}
      />
      <Typography sx={{ fontWeight: '700', fontSize: '20px', mb: 2 }}>
        {title}
      </Typography>
      <Typography>
        {subtitle}
      </Typography>
    </Box>
  );
};
