import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useDarkMode } from '../../hooks/useDarkMode';

const titleStyle = { fontSize: '20px', fontWeight: 'medium' };
const boxStyle = { display: 'flex', gap: 3, flexDirection: 'column' };
const itemStyle = { display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: 'dotted 1px' };

export const ResumeViewer = ({ data, isView }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ bgcolor: isDarkMode ? '#424242' : 'white', borderRadius: '10px', p: 5 }}>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: 'column', width: '100%' }}>
        {isView || (
          <Box sx={{ fontSize: '14px' }}>
            Резюме было размещено {data?.createdAt}
          </Box>
        )}

        <Box>
          <Box sx={{ fontSize: '30px', fontWeight: 'bold' }}>
            {`${data?.lastName} ${data?.firstName}`}
          </Box>
          <Box sx={{ fontSize: '24px', fontWeight: 'medium' }}>
            {data?.position}
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <Box sx={titleStyle}>
            Личная информация
          </Box>
          <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '20px' }}>
            <Box sx={itemStyle}>
              <Box>Дата рождения</Box>
              <Box>{data?.date}</Box>
            </Box>
            <Box sx={itemStyle}>
              <Box>Email</Box>
              <Box>{data?.email}</Box>
            </Box>
            <Box sx={itemStyle}>
              <Box>Город</Box>
              <Box>{data?.city}</Box>
            </Box>
            <Box sx={itemStyle}>
              <Box>Телефон</Box>
              <Box>{data?.phone}</Box>
            </Box>
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <Box sx={titleStyle}>
            Образование
          </Box>
          <Box sx={{ fontSize: '18px' }}>{data?.education?.university}</Box>
          <Box sx={{ display: 'flex', gap: 1, mt: -2, fontSize: '14px' }}>
            <Box>{data?.education?.faculty}</Box>
            <Box>{data?.education?.speciality}</Box>
            <Box>{data?.education?.degree}</Box>
          </Box>
        </Box>

        <Box sx={boxStyle}>
          <Box sx={titleStyle}>
            Навыки
          </Box>
          <Stack direction="row" gap={1}>
            {data?.additional?.skills?.map(skill => (
              <Chip label={skill}/>
            ))}
          </Stack>
        </Box>

        <Box sx={boxStyle}>
          <Box sx={titleStyle}>
            Дополнительные сведения
          </Box>
          <Typography
            variant="body1"
            sx={{ mt: -3 }}
            dangerouslySetInnerHTML={{
              __html: data?.additional?.extra || ''
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
