import React from 'react';
import { Grid } from '@mui/material';
import Clock from './Blocks/Clock';

export default function Dashboard() {
  return (
    <>



      <Grid container>

          <Grid item xs={6}>
            <Grid container style={{ marginRight: '0px' }}>

            
              <Grid item xs={12} style={{"padding":"0px 10px"}}>
                <Clock />
              </Grid>
            </Grid>
    
          </Grid>

        
        
        </Grid>
    </>
  );
}

const today = new Date();
const end = new Date(new Date().setHours(today.getHours() + 4));

const scheduless = [
  {
    id: '1',
    calendarId: '0',
    title: 'TOAST UI Calendar Study',
    category: 'time',
    dueDateClass: '',
    start: today.toISOString(),
    end: end.toISOString(),
  },
  {
    id: '2',
    calendarId: '0',
    title: 'Practice',
    category: 'milestone',
    dueDateClass: '',
    start: today.toISOString(),
    end: end.toISOString(),
    isReadOnly: true,
  },
  {
    id: '3',
    calendarId: '0',
    title: 'FE Workshop',
    category: 'allday',
    dueDateClass: '',
    start: today.toISOString(),
    end: end.toISOString(),
    isReadOnly: true,
  },
  {
    id: '4',
    calendarId: '1',
    title: 'Report',
    category: 'time',
    dueDateClass: '',
    start: today.toISOString(),
    end: end.toISOString(),
  },
];

const categories = [
  {
    id: '0',
    name: 'Private',
    bgColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    bgColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];
