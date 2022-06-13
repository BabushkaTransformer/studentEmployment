import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import ReactApexChart from 'react-apexcharts';

import { Table } from '../../components/monitoring/table/Table';
import { useDarkMode } from '../../hooks/useDarkMode';
import { CreateStudentModal } from '../../components/monitoring/CreateStudentModal';
import { Box, Tooltip } from '@mui/material';
import { Group as GroupIcon, OtherHousesRounded, PlusOne, PriceCheck } from '@mui/icons-material';
import { monitoringAPI } from '../../store/services/MonitoringService';
import IconButton from '@mui/material/IconButton';
import { PageLoader } from '../../components/ui/PageLoader';
import { NotData } from '../NotData';
import { StatusCard } from '../../components/monitoring/statusCard/StatusCard';

export const Group = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const { data, isLoading } = monitoringAPI.useGetStudentsQuery(id);
  const { data: group } = monitoringAPI.useGetGroupByIdQuery(id);

  const [open, setOpen] = React.useState(false);
  const [all, setAll] = React.useState(0);
  const [working, setWorking] = React.useState(0);
  const [notWorking, setNotWorking] = React.useState(0);
  const [abroad, setAbroad] = React.useState(0);
  const [bySpeciality, setBySpeciality] = React.useState(0);
  const [notBySpeciality, setNotBySpeciality] = React.useState(0);
  const [maleCount, setMaleCount] = React.useState(0);
  const [femaleCount, setFemaleCount] = React.useState(0);

  const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
  );

  const renderCusomerBody = (item, index) => (
    <tr key={index} onClick={() => navigate(`/graduate/${item.id}`)}>
      <td>{item.firstName}</td>
      <td>{item.salary}</td>
      <td>{item.city}</td>
      <td>{item.createdAt}</td>
      <td>{item.type}</td>
    </tr>
  );

  const chartOptions = {
    series: [femaleCount, maleCount],
    options: {
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Женщины', 'Мужчины'],
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
      data: [all, working, notWorking, abroad, bySpeciality, notBySpeciality]
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
        categories: ['Общее количество', 'Работают', 'Не работают', 'За границей', 'По специальности', 'Не по специальности']
      }
    }
  };

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  React.useEffect(() => {
    if (data) {
      const allCount = data.length;
      const unemployedCount = data.filter(student => student.unemployed).length;
      const abroadCount = data.filter(student => student.abroad === 'yes').length;
      const bySpecialityCount = data.filter(student => student.bySpeciality === 'yes').length;
      const females = data.filter(student => student.sex === 'female').length;

      setAll(allCount);
      setNotWorking(unemployedCount);
      setWorking(allCount - unemployedCount);
      setAbroad(abroadCount);
      setBySpeciality(bySpecialityCount);
      setNotBySpeciality(allCount - unemployedCount - bySpecialityCount);
      setFemaleCount(females);
      setMaleCount(allCount - females);
    }
  }, [data]);

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  const statusCards = [
    {
      'icon': <GroupIcon fontSize="large"/>,
      'count': data?.length,
      'title': 'Количество выпускников'
    },
    {
      'icon': <PriceCheck fontSize="large"/>,
      'count': data?.length,
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

  return (
    <div>
      <h2 className="page-header">{group?.title}</h2>
      <div className="row">
        <div className="col-11">
          <div className="row">
            {
              statusCards.map((item, index) => (
                <div className="col-3" key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>

          {data?.length ? (
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
                <div className="col-12">
                  <div className="card">
                    <ReactApexChart options={barData.options} series={barData.series} type="bar"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card full-height">
                    <ReactApexChart
                      options={chartOptions.options}
                      series={chartOptions.series}
                      type="pie"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NotData subtitle="Похоже в эту группу не было добавлено ни одного студента"/>
          )}
        </div>
        <div className="col-1">
          <Box className="card flex-center" sx={{
            position: 'sticky',
            top: '95.5px',
            p: '20px'
          }}>
            <Tooltip title="Добавить выпускника">
              <IconButton onClick={toggleModal} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textAlign: 'center',
                fontSize: '12px',
              }}>
                <PlusOne/>
                  Добавить <br/> выпускника
              </IconButton>
            </Tooltip>
          </Box>
        </div>
        <CreateStudentModal
          open={open}
          onClose={toggleModal}
          group={group}
        />
      </div>
    </div>
  );
};
