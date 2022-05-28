import React from 'react';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';

import { Box, Button, MenuItem, Modal, Select, TextField } from '@mui/material';
import { monitoringAPI } from '../../store/services/MonitoringService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 2,
  pt: 2,
  px: 4,
  pb: 3
};

export const CreateGroupModal = ({ open, onClose }) => {
  const [title, setTitle] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('2022');
  const [createGroup, { isLoading }] = monitoringAPI.useCreateGroupMutation();

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      await createGroup({ title, expirationDate, createdAt: serverTimestamp() });
      toast.success('Создано!');
      setTitle('');
      onClose();
    } catch (error) {
      toast.error('Что-то пошло не так...');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box component="form" sx={{ ...style }} onSubmit={handleCreateGroup}>
        <TextField
          fullWidth
          value={title}
          placeholder="Название группы"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          name="abroad"
          value={expirationDate}
          fullWidth
          onChange={e => setExpirationDate(e.target.value)}
        >
          <MenuItem value="2019">2019</MenuItem>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
        </Select>
        <Button variant="contained" type="submit">
          Создать
        </Button>
      </Box>
    </Modal>
  );
};
