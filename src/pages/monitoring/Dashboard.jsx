import React from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

import { StatusCard } from '../../components/monitoring/statusCard/StatusCard';
import { Table } from '../../components/monitoring/table/Table';
import { Badge } from '../../components/monitoring/badge/Badge';
import { useDarkMode } from '../../hooks/useDarkMode';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { Group, OtherHousesRounded, PriceCheck } from '@mui/icons-material';

const statusCards = [
  {
    'icon': <Group fontSize="large"/>,
    'count': '1,995',
    'title': 'Количество выпускников'
  },
  {
    'icon': <PriceCheck fontSize="large"/>,
    'count': '2,001',
    'title': 'Количество групп'
  },
  {
    'icon': <PriceCheck fontSize="large"/>,
    'count': '$2,632',
    'title': 'Средняя зарплата'
  },
  {
    'icon':  <OtherHousesRounded fontSize="large"/>,
    'count': '1,711',
    'title': 'Еще что то'
  }
];
const chartOptions = {
  series: [{
    name: 'Работают',
    data: [44, 55, 57, 56]
  }, {
    name: 'Общее',
    data: [76, 85, 101, 98]
  }, {
    name: 'Без работы',
    data: [35, 41, 36, 26]
  }, {
    name: 'За границей',
    data: [12, 11, 7, 22]
  }],
  options: {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['2018', '2019', '2020', '2021']
    },
    yaxis: {
      title: {
        text: 'Выпускники'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' выпускников';
        }
      }
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
  </tr>
);

const orderStatus = {
  'shipping': 'primary',
  'pending': 'warning',
  'paid': 'success',
  'refund': 'danger'
};

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.firstName}</td>
    <td>{item.createdAt}</td>
    <td>{item.salary}</td>
    <td>{item.city}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status}/>
    </td>
  </tr>
);

export const Dashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { data } = monitoringAPI.useGetStudentsQuery();

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCards.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={data?.length || 0}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <ReactApexChart
              options={chartOptions.options}
              series={chartOptions.series}
              height="100%"
              type="bar"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>По зарплате</h3>
            </div>
            <div className="card__body">
              <Table
                key={data ? data.length : 'card-table'}
                headData={[
                  'firstName',
                  'salary',
                  'city'
                ]}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={data || []}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Последние добавленные</h3>
            </div>
            <div className="card__body">
              <Table
                key={data ? data.length : 'card-table'}
                headData={[
                  'firstName',
                  'createdAt',
                  'salary',
                  'city'
                ]}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={data || []}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
