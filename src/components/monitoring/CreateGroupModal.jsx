import React from 'react';
import { toast } from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
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

export const CreateGroupModal = ({ open, onClose, groups }) => {
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
        <FormControl fullWidth>
          <InputLabel>Дата выпуска</InputLabel>
          <Select
            name="abroad"
            value={expirationDate}
            fullWidth
            label="Дата выпуска"
            onChange={e => setExpirationDate(e.target.value)}
          >
            {groups?.map(el => (
              <MenuItem
                key={el}
                value={el}
              >
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Создать
        </Button>
      </Box>
    </Modal>
  );
};
