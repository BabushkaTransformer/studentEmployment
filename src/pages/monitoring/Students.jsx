import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { Table } from '../../components/monitoring/table/Table';
import { getFullName } from '../../utils';
import { PageLoader } from '../../components/ui/PageLoader';
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { monitoringAPI } from '../../store/services/MonitoringService';

const customerTableHead = [
  'ФИО',
  'email',
  'Телефон',
  'Тип работы',
  'Зарплата',
  'Город',
  'Дата создания'
];

export const Students = () => {
  const { data, isLoading: fetchLoading } = monitoringAPI.useGetStudentsQuery();
  const navigate = useNavigate();

  const [deleteGraduate, { isLoading: deleteLoading }] = monitoringAPI.useDeleteStudentMutation();

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    try {
      await deleteGraduate(id).unwrap();
      toast.success('Удалено!');
    } catch (e) {
      toast.error('Что то пошло не так...');
    }
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index} onClick={() => navigate(`/graduate/${item.id}`)}>
      <td>{getFullName(item)}</td>
      <td>{item.email || '-'}</td>
      <td>{item.phone || '-'}</td>
      <td>{item.type || '-'}</td>
      <td>{item.salary ? `${item.salary}c.` : '-'}</td>
      <td>{item.city || '-'}</td>
      <td>{item.createdAt || '-'}</td>
      <td>
        <Tooltip title="Удалить из базы">
          <IconButton onClick={(event) => handleDelete(event, item.id)}>
            <Delete/>
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );

  if (fetchLoading) {
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
                key={data ? data.length : 'students-table'}
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={data || []}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
