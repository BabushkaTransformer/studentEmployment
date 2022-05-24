import React from 'react';
import { resumeAPI } from '../../store/services/ResumeService';
import { ResumeCard } from '../../components/resume/ResumeCard';
import { PageLoader } from '../../components/ui/PageLoader';
import { Box } from '@mui/material';

export const ResumeList = () => {
  const { data, isLoading } = resumeAPI.useGetAllResumeQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {data?.map(resume => (
        <ResumeCard key={resume.id} {...resume}/>
      ))}
    </Box>
  );
};
