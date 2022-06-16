import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import ReactApexChart from 'react-apexcharts';

import { StatusCard } from '../../components/monitoring/statusCard/StatusCard';
import { Table } from '../../components/monitoring/table/Table';
import { PageLoader } from '../../components/ui/PageLoader';
import { monitoringAPI } from '../../store/services/MonitoringService';
import { Group, OtherHousesRounded, PriceCheck } from '@mui/icons-material';
import { getFullName } from '../../utils';

const barOptions = {
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
};

const lineOptions = {
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  }
};


const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{getFullName(item)}</td>
    <td>{item.createdAt || '-'}</td>
    <td>{item.salary ? `${item.salary}c.` : '-'}</td>
    <td>{item.city || '-'}</td>
  </tr>
);

export const Dashboard = () => {
    const { isDarkMode } = useDarkMode();
    const [options, setOptions] = React.useState([]);
    const [converted, setConverted] = React.useState({});
    const { data, isLoading } = monitoringAPI.useGetStudentsQuery();
    const { data: group, isLoading: groupLoading } = monitoringAPI.useGetGroupsQuery();

    React.useEffect(() => {
      if (data) {
        const bata = {};
        const sata = [{
          name: 'Работают',
          value: 'working',
          data: []
        }, {
          name: 'Общее',
          value: 'all',
          data: []
        }, {
          name: 'Без работы',
          value: 'unemployed',
          data: []
        }, {
          name: 'За границей',
          value: 'abroad',
          data: []
        }];

        data.forEach(student => {
          if (bata[student.expirationDate]) {
            bata[student.expirationDate] = {
              working: !student.unemployed ? bata[student.expirationDate].working + 1 : bata[student.expirationDate].working,
              all: bata[student.expirationDate].all + 1,
              unemployed: student.unemployed ? bata[student.expirationDate].unemployed + 1 : bata[student.expirationDate].unemployed,
              abroad: student.abroad === 'yes' ? bata[student.expirationDate].abroad + 1 : bata[student.expirationDate].abroad,
              averageSalary: student.salary ? bata[student.expirationDate].averageSalary + Number(student.salary) / 2 : bata[student.expirationDate].averageSalary
            };
          } else {
            bata[student.expirationDate] = {
              working: !student.unemployed ? 1 : 0,
              all: 1,
              unemployed: student.unemployed ? 1 : 0,
              abroad: student.abroad ? 1 : 0,
              averageSalary: student.salary ? Number(student.salary) / 2 : 0
            };
          }
        });

        Object.keys(bata).forEach(el => {
          for (let key in bata[el]) {
            const index = sata.findIndex(el => el.value === key);
            if (index !== -1) {
              sata[index].data.push(bata[el][key]);
            }
          }
        });

        setConverted(bata);
        setOptions(sata);
      }
    }, [data]);


    const statusCards = [
      {
        'icon': <Group fontSize="large"/>,
        'count': data?.length,
        'title': 'Количество выпускников'
      },
      {
        'icon': <PriceCheck fontSize="large"/>,
        'count': group?.length,
        'title': 'Количество групп'
      },
      {
        'icon': <PriceCheck fontSize="large"/>,
        'count': data ? Math.floor(data.reduce((acc, el) => acc + +el.salary, 0) / data.length) : null,
        'title': 'Средняя зарплата'
      },
      {
        'icon': <OtherHousesRounded fontSize="large"/>,
        'count': data?.filter(el => !el.unemployed).length,
        'title': 'Колчество обустроенных'
      }
    ];

    if (isLoading || groupLoading) {
      return (
        <PageLoader/>
      );
    }

    return (
      <div>
        <h2 className="page-header">Все выпускники</h2>
        <div className="row">

          <div className="col-6">
            <div className="row">
              {
                statusCards.map((item, index) => (
                  <div className="col-6" key={index}>
                    <StatusCard
                      icon={item.icon}
                      count={item.count}
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
                options={{
                  ...barOptions,
                  xaxis: { categories: Object.keys(converted) },
                  theme: { mode: isDarkMode ? 'dark' : 'light' }
                }}
                series={options}
                height="100%"
                type="bar"
              />
            </div>
          </div>

          <div className="col-6">
            <div className="card">
              <div className="card__header">
                <h3>Количество выпускников каждого года</h3>
              </div>
              <ReactApexChart
                options={{
                  ...lineOptions,
                  xaxis: { categories: Object.keys(converted) },
                  theme: { mode: isDarkMode ? 'dark' : 'light' }
                }}
                series={[
                  {
                    name: 'Коичество выпускников',
                    data: Object.keys(converted).map((el) => converted[el].all)
                  }
                  // {
                  //   name: 'Средняя зарплата',
                  //   data: Object.keys(converted).map((el) => converted[el].averageSalary/10000)
                  // }
                ]}
                height={350}
                type="line"
              />
            </div>
          </div>

          <div className="col-6">
            <div className="card">
              <div className="card__header">
                <h3>Последние добавленные</h3>
              </div>
              <div className="card__body">
                <Table
                  key={data ? data.length : 'card-table'}
                  headData={[
                    'ФИО',
                    'Дата создания',
                    'Зарплата',
                    'Город'
                  ]}
                  renderHead={(item, index) => renderOrderHead(item, index)}
                  bodyData={data || []}
                  renderBody={(item, index) => renderOrderBody(item, index)}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
;
