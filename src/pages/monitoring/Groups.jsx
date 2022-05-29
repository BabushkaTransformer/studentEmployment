import React from 'react';

import { GroupCard } from '../../components/monitoring/GroupCard';
import { CreateGroupModal } from '../../components/monitoring/CreateGroupModal';
import { Box, Button, Typography } from '@mui/material';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { PageLoader } from '../../components/ui/PageLoader';

const groups = ['2022', '2021', '2020', '2019', '2018'];

export const Groups = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = monitoringAPI.useGetGroupsQuery();

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <div>
      <div className="flex-end">
        <Button onClick={toggleModal}>
          Создать группу
        </Button>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {groups.map(el => (
          data.filter(group => group.expirationDate === el).length ? (
            <Box>
              <Typography variant="h5">
                {el} год
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {data.filter(group => group.expirationDate === el).map(group => (
                  <GroupCard key={group.id} {...group}/>
                ))}
              </Box>
            </Box>
          ) : null
        ))}
      </Box>
      <CreateGroupModal
        open={open}
        onClose={toggleModal}
      />
    </div>
  );
};
