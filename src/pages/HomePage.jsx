import React from 'react';

import { AllPosts } from './forum/AllPosts';
import { Events } from './event/Events';
import { Vacancies } from './vacancy/Vacancies';
import { Box, Tab, Tabs, Typography } from '@mui/material';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '95%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Мероприятия" {...a11yProps(0)} />
          <Tab label="Посты" {...a11yProps(1)} />
          <Tab label="Вакансии" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography sx={{ fontWeight: '500', pb: '30px' }} variant="h5">
          Последние мероприятия
        </Typography>
        <Events isTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography sx={{ fontWeight: '500', pb: '30px' }} variant="h5">
          Последние посты
        </Typography>
        <AllPosts isTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography sx={{ fontWeight: '500', pb: '30px' }} variant="h5">
          Последние вакансии
        </Typography>
        <Vacancies isTab/>
      </TabPanel>
    </Box>
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      style={{ flexGrow: 1 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}