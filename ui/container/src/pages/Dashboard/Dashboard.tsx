import ConsumerDashboard from "./ConsumerDashboard";
import AdminDashboard from "./AdminDashboard";
import { selectUser } from "../../store/auth";
import { useSelector } from "react-redux";
import {UserRole} from "../../types";
import { LAST_LOCATION_KEY, LAST_LOCATION_WAS_LOGGEDIN_KEY, LOCATION_SKIP_LIST } from "src/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DASHBOARDMAP = {
  [UserRole.ADMIN]: AdminDashboard,
  [UserRole.CONSUMER]: ConsumerDashboard,
};
export default function Dashboard({ title, description }) {
  const navigate = useNavigate();
  const me = useSelector(selectUser);
  const DashboardComponent = DASHBOARDMAP[me?.role as UserRole];
  const lastLocation = window.localStorage.getItem(LAST_LOCATION_KEY) || undefined;
  const lastLocationWasLogged = window.localStorage.getItem(LAST_LOCATION_WAS_LOGGEDIN_KEY) === 'true';

  useEffect(() => {
    // Redirect to lastLocation only when comes from a url from public url
    if(!LOCATION_SKIP_LIST.includes(lastLocation) && !lastLocationWasLogged){
      navigate(lastLocation!);
    }
  }, [lastLocation, lastLocationWasLogged, navigate]);

  return <DashboardComponent title={title} description={description} />;
}