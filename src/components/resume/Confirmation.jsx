import React from 'react';
import Box from '@mui/material/Box';

export const Confirmation = ({
  skills,
  formValues,
  education
}) => {
  console.log(education, formValues);
  return (
    <div>
      <Box>
        {skills.skills.map(el => (
          <Box>{el.value}</Box>
        ))}
      </Box>
      <Box>
        {education.university.value}
        {education.university.value}
      </Box>
    </div>
  );
};
