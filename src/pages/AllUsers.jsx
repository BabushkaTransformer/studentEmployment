import React from 'react';
import { toast } from 'react-hot-toast';
import { useDarkMode } from '../hooks/useDarkMode';

import { Table } from '../components/monitoring/table/Table';
import { PageLoader } from '../components/ui/PageLoader';
import { getFullName } from '../utils';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Typography,
  InputLabel,
  Tooltip, CircularProgress
} from '@mui/material';
import { authAPI } from '../store/services/AuthService';
import { Delete, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const customerTableHead = [
  'ФИО',
  'email',
  'Телефон',
  'Город',
  'Дата создания',
  'Роль'
];

const rolesText = {
  'user': 'Пользователь',
  'admin': 'Администратор',
  'instructor': 'Преподователь'
};

export const AllUsers = () => {
  const { isDarkMode } = useDarkMode();
  const { uid } = useSelector(state => state.auth);

  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('user');
  const [id, setId] = React.useState('');
  const [rand, setRand] = React.useState(null);

  const { data, isLoading } = authAPI.useGetUsersQuery();
  const [updateRole, { isLoading: updateLoading }] = authAPI.useChangeUserRoleMutation();

  React.useEffect(() => {
    data && setRand((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
  }, [data]);

  const handleOpen = (event, user) => {
    event.stopPropagation();
    setOpen(true);
    setRole(user.role || 'user');
    setId(user.id);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  const changeRole = async () => {
    try {
      await updateRole({ id, data: { role } }).unwrap();
      toast.success('Роль изменен!');
    } catch (e) {
      toast.error('Что то пошло не так...');
    } finally {
      setOpen(false);
    }
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{getFullName(item)}</td>
      <td>{item.email || '-'}</td>
      <td>{item.phone || '-'}</td>
      <td>{item.city || '-'}</td>
      <td>{item.createdAt || '-'}</td>
      <td>{rolesText[item.role] || 'Пользователь'}</td>
      {uid !==  item.id && (
        <td>
          <Tooltip title="Поменять роль" onClick={(event) => handleOpen(event, item)}>
            <Edit fontSize="small">
              <Delete/>
            </Edit>
          </Tooltip>
        </td>
      )}
    </tr>
  );

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <div>
      <h2 className="page-header">
        все студенты
      </h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                key={rand || 'table-id'}
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={data || []}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          className="modal-classes"
          sx={{
            bgcolor: isDarkMode ? 'black' : 'white',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
          <Typography variant="h6" component="h2">
            Выберите роль
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Роль</InputLabel>
            <Select
              value={role}
              label="Роль"
              onChange={handleChange}
            >
              <MenuItem value="admin">Администратор</MenuItem>
              <MenuItem value="instructor">Преподователь</MenuItem>
              <MenuItem value="user">Пользователь</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            disabled={updateLoading}
            onClick={changeRole}
          >
            {updateLoading
              ? <CircularProgress size={26} color="inherit"/>
              : 'Сохранить'
            }
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
