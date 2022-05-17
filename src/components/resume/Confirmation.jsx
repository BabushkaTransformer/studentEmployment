import React from 'react';
import { toast } from 'react-hot-toast';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { resumeAPI } from '../../store/services/ResumeService';
import { ResumeViewer } from './ResumeViewer';
import { serverTimestamp } from 'firebase/firestore';

export const Confirmation = ({
  skills,
  formValues,
  education,
  handlePrev
}) => {
  const [data, setData] = React.useState({});
  const [skillsData, setSkillsData] = React.useState({});
  const [educationData, setEducationData] = React.useState({});

  const [createResume] = resumeAPI.useCreateResumeMutation();

  React.useEffect(() => {
    const result = Object.keys(formValues).reduce((acc, el) => {
      return { ...acc, [el]: formValues[el].value }
    }, {});
    const result1 = Object.keys(education).reduce((acc, el) => {
      return { ...acc, [el]: education[el].value }
    }, {});
    const result2 = skills.skills.map((el) => el.value);
    setData(result);
    setEducationData(result1);
    setSkillsData({ extra: skills.extra.value, skills: result2 });

  }, [skills, formValues, education]);

  const handleCreateResume = async () => {
    const resume = {
      ...data,
      education: educationData,
      additional: skillsData,
      createdAt: serverTimestamp()
    };

    try {
      await createResume(resume);
      toast.success('Создано!');
    } catch (error) {
      toast.error('Что то пошло не так');
    }
  }

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
          onClick={handleCreateResume}
        >
          Создать
        </Button>
      </Box>
    </div>
  );
};
