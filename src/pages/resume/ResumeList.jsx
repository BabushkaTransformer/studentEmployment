import React from 'react';
import { resumeAPI } from '../../store/services/ResumeService';
import { ResumeCard } from '../../components/resume/ResumeCard';
import { PageLoader } from '../../components/ui/PageLoader';

export const ResumeList = () => {
  const { data, isLoading } = resumeAPI.useGetAllResumeQuery();

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }
  return (
    <div>
      {data?.map(resume => (
        <ResumeCard key={resume.id} {...resume}/>
      ))}
    </div>
  );
};
