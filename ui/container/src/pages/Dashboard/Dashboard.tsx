import ConsumerDashboard from "./ConsumerDashboard";
import AdminDashboard from "./AdminDashboard";
import { selectUser } from "../../store/auth";
import { useSelector } from "react-redux";
import {UserRole} from "../../types";

const DASHBOARDMAP = {
  [UserRole.ADMIN]: AdminDashboard,
  [UserRole.CONSUMER]: ConsumerDashboard,
};
export default function Dashboard({ title, description }) {
  const me = useSelector(selectUser);
  const DashboardComponent = DASHBOARDMAP[me?.role as UserRole];
  return <DashboardComponent title={title} description={description} />;
}