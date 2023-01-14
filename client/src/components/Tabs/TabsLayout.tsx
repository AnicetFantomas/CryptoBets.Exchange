import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Positions from './Position';
import Trades from './Trades';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='mx-3'>
      <h2 className='mb-2 text-2xl font-bold text-gray-200'>Trades</h2>
      <div className='w-1/4 pb-1 mb-4 bg-slate-200 h-2px'></div>
      <Box sx={{ width: '100%'  }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{ color: '#ffff'  }} label="Positions" {...a11yProps(0)} />
            <Tab sx={{ color: '#ffff'  }} label="Trades" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className='w-full overflow-scroll sm:overflow-auto'>
            <Positions />
          </div>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className='overflow-scroll sm:overflow-auto'>
            <Trades />
          </div>
        </TabPanel>
      </Box>
    </div>

  );
}
