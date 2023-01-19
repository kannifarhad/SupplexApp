import React from 'react';
import CalendarWidget from '../../components//Widgets/CalendarWidget';
import { DashBoardInfoBlock } from '../../components//Blocks';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Translate, TranslateFunc } from '../../utils';
import Clock from './Blocks/Clock';

export default function Dashboard() {
  const { translateWord } = TranslateFunc();
  return (
    <>
      <Helmet>
        <title>{`${translateWord("Main Panel")} | Cronus Dashboard`}</title>
      </Helmet>


      <Grid container>

          <Grid item xs={6}>
            <Grid container style={{ marginRight: '0px' }}>

              <Grid item xs={6} style={{"padding":"0px 10px"}}>
                <DashBoardInfoBlock
                  mainIcon="fad fa-newspaper"
                  title={<Translate>Published Posts</Translate>}
                  description="205"
                  footerIcon="icon-link"
                  foooterText={<Translate>View All Posts</Translate>}
                  color="yellow"
                />
              </Grid>
              <Grid item xs={6} style={{"padding":"0px 10px"}}>
                <DashBoardInfoBlock
                  mainIcon="fad fa-folder-tree"
                  title={<Translate>Post Categories</Translate>}
                  description="20"
                  footerIcon="icon-link"
                  foooterText={<Translate>View All Post Categories</Translate>}
                  color="green"
                />
              </Grid>
              <Grid item xs={6} style={{"padding":"0px 10px"}}>
                <DashBoardInfoBlock
                  mainIcon="fad fa-users"
                  title={<Translate>Users</Translate>}
                  description="5"
                  footerIcon="icon-link"
                  foooterText={<Translate>View All Users</Translate>}
                  color="red"
                />
              </Grid>
              <Grid item xs={6} style={{"padding":"0px 10px"}}>
                <DashBoardInfoBlock
                  mainIcon="fad fa-server"
                  title={<Translate>Used Space</Translate>}
                  description="49/50 GB"
                  footerIcon="icon-warning"
                  foooterText={<Translate>For increasing server space contact administrator</Translate>}
                  color="blue"
                />
              </Grid>
            
              <Grid item xs={12} style={{"padding":"0px 10px"}}>
                <Clock />
              </Grid>
            </Grid>
    
          </Grid>

          <Grid item xs={6} style={{"padding":"0px 10px"}}>
            <DashBoardInfoBlock
              mainIcon="fad fa-calendar-alt"
              title={<Translate>Daily Calendar & Tasks</Translate>}
              description="3 Tasks"
              footerIcon="fas fa-calendar"
              foooterText={<Translate>View All Tasks</Translate>}
              color="yellow"
              Component={() => {
                return (
                  <CalendarWidget
                    scheduless={scheduless}
                    categories={categories}
                    selectedView="month"
                  />
                );
              }}
            />
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
