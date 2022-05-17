import React from 'react';
import { useParams } from 'react-router';

import { ResumeViewer } from '../../components/resume/ResumeViewer';
import { PageLoader } from '../../components/ui/PageLoader';
import { resumeAPI } from '../../store/services/ResumeService';

export const ResumeDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = resumeAPI.useGetResumeByIdQuery(id);

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <div>
      <ResumeViewer data={data}/>
    </div>
  );
};
