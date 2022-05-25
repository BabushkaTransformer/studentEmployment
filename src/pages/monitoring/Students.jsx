import React from 'react';
import { Table } from '../../components/monitoring/table/Table';
import { monitoringAPI } from '../../store/services/MonitoringService';

const customerTableHead = [
  'firstName',
  'email',
  'phone',
  'type',
  'salary',
  'city'
];

export const Students = () => {
  const { data } = monitoringAPI.useGetStudentsQuery();

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item?.firstName}</td>
      <td>{item?.email}</td>
      <td>{item?.phone}</td>
      <td>{item?.type}</td>
      <td>{item?.salary}</td>
      <td>{item?.city}</td>
    </tr>
  );

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
