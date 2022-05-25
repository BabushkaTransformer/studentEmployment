import React from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { Table } from '../../components/monitoring/table/Table';
import { useDarkMode } from '../../hooks/useDarkMode';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { Box, Button, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Create, PlusOne } from '@mui/icons-material';

const chartOptions = {
  series: [44, 55, 13],
  options: {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: ['Работают', 'Не работают', 'За границей'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
};

const barData = {
  series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Общее количество', 'Работают', 'Не работают', 'За границей', 'По специальности', 'Не по специальности', 'Средняя зарплата']
    }
  }
};

const renderCusomerHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.firstName}</td>
    <td>{item.salary}</td>
    <td>{item.city}</td>
    <td>{item.createdAt}</td>
    <td>{item.type}</td>
  </tr>
);

export const Group = () => {
  const { isDarkMode } = useDarkMode();
  const { data } = monitoringAPI.useGetStudentsQuery();

  return (
    <div className="row">
      <div className="col-11">
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card__header">
                <h3>Студенты группы</h3>
              </div>
              <div className="card__body">
                <Table
                  key={data ? data.length : 'card-table'}
                  headData={[
                    'ФИО',
                    'Зарплата',
                    'Город',
                    'Тип работы',
                    'Дата создания'
                  ]}
                  renderHead={(item, index) => renderCusomerHead(item, index)}
                  bodyData={data || []}
                  renderBody={(item, index) => renderCusomerBody(item, index)}
                />
              </div>
              <div className="card__footer">
                <Link to="/"></Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card full-height">
              <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type="pie"
                height="100%"
              />
            </div>
          </div>
          <div className="col-8">
          </div>
          <div className="col-4">
            <div className="card">
              <ReactApexChart options={barData.options} series={barData.series} type="bar"/>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1">
        <Box className="card flex-center" sx={{ position: "sticky", top: "95.5px" }}>
          <Tooltip title="Добавить пользователя">
            <IconButton>
              <PlusOne />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </div>
  );
};
