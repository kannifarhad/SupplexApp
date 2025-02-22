import React from "react";
// import CalendarWidget from '../../components/Widgets/CalendarWidget';
import ContentWrapper from "./ContentWrapper";
import { DashBoardInfoBlock } from "../../components/Molecules";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from "react-i18next";
import Clock from "./components/Clock";

export default function Dashboard({ title, description }) {
  const { t } = useTranslation();
  return (
    <ContentWrapper title={title} description={description}>
      <Helmet>
        <title>{`${t("Main Panel")} | Supplex Dashboard`}</title>
      </Helmet>

      <Grid container>

        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <Clock />
          {/* <DashBoardInfoBlock
              mainIcon="fad fa-calendar-alt"
              title={<Trans>Daily Calendar & Tasks</Trans>}
              description="3 Tasks"
              footerIcon="fas fa-calendar"
              foooterText={<Trans>View All Tasks</Trans>}
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
            /> */}
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}

const today = new Date();
const end = new Date(new Date().setHours(today.getHours() + 4));

const scheduless = [
  {
    id: "1",
    calendarId: "0",
    title: "TOAST UI Calendar Study",
    category: "time",
    dueDateClass: "",
    start: today.toISOString(),
    end: end.toISOString(),
  },
  {
    id: "2",
    calendarId: "0",
    title: "Practice",
    category: "milestone",
    dueDateClass: "",
    start: today.toISOString(),
    end: end.toISOString(),
    isReadOnly: true,
  },
  {
    id: "3",
    calendarId: "0",
    title: "FE Workshop",
    category: "allday",
    dueDateClass: "",
    start: today.toISOString(),
    end: end.toISOString(),
    isReadOnly: true,
  },
  {
    id: "4",
    calendarId: "1",
    title: "Report",
    category: "time",
    dueDateClass: "",
    start: today.toISOString(),
    end: end.toISOString(),
  },
];

const categories = [
  {
    id: "0",
    name: "Private",
    bgColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
  {
    id: "1",
    name: "Company",
    bgColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
];
