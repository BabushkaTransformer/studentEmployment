import React from 'react';
import Box from '@mui/material/Box';
import { ResumeViewer } from './ResumeViewer';
import { Button } from '@mui/material';

export const Confirmation = ({
  skills,
  formValues,
  education,
  handlePrev
}) => {
  const [data, setData] = React.useState({});
  const [skillsData, setSkillsData] = React.useState({});
  const [educationData, setEducationData] = React.useState({});

  React.useEffect(() => {
    const result = Object.keys(formValues).reduce((acc, el) => {
      return { ...acc, [el]: formValues[el].value }
    }, {});
    const result1 = Object.keys(education).reduce((acc, el) => {
      return { ...acc, [el]: education[el].value }
    }, {});
    const result2 = skills.skills.map((el) => el.value);
    console.log(skills)
    setData(result);
    setEducationData(result1);
    setSkillsData({ extra: skills.extra.value, skills: result2 });

  }, [skills, formValues, education]);


  return (
    <div>
      <ResumeViewer
        isView
        data={{ ...data, education: educationData, additional: skillsData }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={handlePrev} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
        >
          Comfirm
        </Button>
      </Box>
    </div>
  );
};
