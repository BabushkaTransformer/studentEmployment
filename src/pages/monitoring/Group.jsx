import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useDarkMode } from '../../hooks/useDarkMode';
import ReactApexChart from 'react-apexcharts';

import { Table } from '../../components/monitoring/table/Table';
import { NotData } from '../NotData';
import { StatusCard } from '../../components/monitoring/statusCard/StatusCard';
import { PageLoader } from '../../components/ui/PageLoader';
import { CreateStudentModal } from '../../components/monitoring/CreateStudentModal';
import { getFullName } from '../../utils';
import { Box, Tooltip, Typography } from '@mui/material';
import {
  CopyAll, Delete,
  Group as GroupIcon,
  OtherHousesRounded,
  PlusOne,
  PriceCheck
} from '@mui/icons-material';
import { monitoringAPI } from '../../store/services/MonitoringService';
import IconButton from '@mui/material/IconButton';


const workingType = {
  'remote': 'Удаленно',
  'office': 'Офис'
};

const barOptions = {
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
};

const pieOptions = {
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
};

export const Group = () => {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const { data, isLoading } = monitoringAPI.useGetStudentsQuery(id);
  const { data: group } = monitoringAPI.useGetGroupByIdQuery(id);

  const [deleteGraduate, { isLoading: deleteLoading }] = monitoringAPI.useDeleteStudentMutation();

  const [open, setOpen] = React.useState(false);
  const [all, setAll] = React.useState(0);
  const [working, setWorking] = React.useState(0);
  const [notWorking, setNotWorking] = React.useState(0);
  const [abroad, setAbroad] = React.useState(0);
  const [bySpeciality, setBySpeciality] = React.useState(0);
  const [notBySpeciality, setNotBySpeciality] = React.useState(0);
  const [maleCount, setMaleCount] = React.useState(0);
  const [femaleCount, setFemaleCount] = React.useState(0);


  const handleDelete = async (event, id) => {
    event.stopPropagation();
    try {
      await deleteGraduate(id).unwrap();
      toast.success('Удалено!');
    } catch (e) {
      toast.error('Что то пошло не так...');
    }
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

  const toggleModal = () => {
    setOpen(prev => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/graduateRegistration?id=${id}`);
    toast.success('Скопировано!');
  };

  const statusCards = [
    {
      'icon': <GroupIcon fontSize="large"/>,
      'count': all,
      'title': 'Количество выпускников'
    },
    {
      'icon': <PriceCheck fontSize="large"/>,
      'count': data ? Math.floor(data.reduce((acc, el) => acc + +el.salary, 0) / data.length) + 'c' : null,
      'title': 'Средняя зарплата'
    },
    {
      'icon': <OtherHousesRounded fontSize="large"/>,
      'count': data?.filter(el => !el.unemployed).length,
      'title': 'Колчество обустроенных'
    }
  ];

  const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
  );

  const renderCusomerBody = (item, index) => (
    <tr key={index} onClick={() => navigate(`/graduate/${item.id}`)}>
      <td>{getFullName(item)}</td>
      <td>{item.salary ? `${item.salary}c.` : '-'}</td>
      <td>{item.city || '-'}</td>
      <td>{item.createdAt || '-'}</td>
      <td>{workingType[item.type] || '-'}</td>
      <td>
        <Tooltip title="Удалить из базы">
          <IconButton onClick={(event) => handleDelete(event, item.id)}>
            <Delete/>
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <PageLoader/>
    );
  }

  return (
    <div>
      <Box className="flex-start" sx={{ alignItems: 'center', gap: 4, my: 4 }}>
        <Typography variant="h4" fontWeight="500">{group?.title}</Typography>
        <Box className="flex-start" gap={2}>
          <Box sx={{
            fontSize: '14px',
            background: isDarkMode ? 'dark' : 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            boxShadow: 1
          }}>
            {`${window.location.origin}/graduateRegistration?id=${id}`}
          </Box>
          <Tooltip title="Скопировать текст">
            <IconButton onClick={copyToClipboard}>
              <CopyAll/>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <div className="row">
        <div className="col-11">
          {data?.length ? (
            <div className="row">
              <div className="col-8">
                <div className="row">
                  {
                    statusCards.map((item, index) => (
                      <div className="col-4" key={index}>
                        <StatusCard
                          icon={item.icon}
                          count={item.count}
                          title={item.title}
                        />
                      </div>
                    ))
                  }
                </div>
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
                        'Дата создания',
                        'Тип работы'
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
                    <ReactApexChart
                      type="bar"
                      options={{
                        ...barOptions,
                        theme: { mode: isDarkMode ? 'dark' : 'light'  }
                      }}
                      series={[{
                        data: [all, working, notWorking, abroad, bySpeciality, notBySpeciality]
                      }]}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="card full-height">
                    <ReactApexChart
                      type="pie"
                      height="100%"
                      options={{
                        ...pieOptions,
                        theme: { mode: isDarkMode ? 'dark' : 'light'  }
                      }}
                      series={[femaleCount, maleCount]}
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
                fontSize: '12px'
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
