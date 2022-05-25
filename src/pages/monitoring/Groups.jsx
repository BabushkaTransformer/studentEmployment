import React from 'react';

import { GroupCard } from '../../components/monitoring/GroupCard';
import { CreateGroupModal } from '../../components/monitoring/CreateGroupModal';
import { Box, Button } from '@mui/material';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { PageLoader } from '../../components/ui/PageLoader';

export const Groups = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = monitoringAPI.useGetGroupsQuery();

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  if (isLoading) {
    return (
      <PageLoader/>
    )
  }

  return (
    <div>
      <div className="flex-end">
        <Button onClick={toggleModal}>
          Создать группу
        </Button>
      </div>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {data.map(group => (
          <GroupCard key={group.id} {...group}/>
        ))}
      </Box>
      <CreateGroupModal
        open={open}
        onClose={toggleModal}
      />
    </div>
  );
};
