import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useLocationSaver from "../hooks/locationSaver";
import { useAppDispatch } from "../store";
import { selectUser } from "../store/auth";
import { cleanError, selectErrorSlice } from "../store/error";
import store from "../store";
import { SiteRoute } from "./types";
import AccessDeniedNotice from '../pages/Dashboard/AccessDenied';
import { closeSidebar, openSidebar } from "../store/navigation";
import _ from "lodash";

export const ProtectedRoute = ({
  children,
  accessRoles,
}: {
  children: ReactElement | null;
  accessRoles?: string[];
}) => {
  useLocationSaver();
  const dispatch = useAppDispatch();
  // dispatch(sidebarCollapsed ? closeSidebar() : openSidebar())
  const me = useSelector(selectUser);
  const { errorType } = useSelector(selectErrorSlice);
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(cleanError())
  }, [navigate]);
  if(errorType === "FORBIDDEN" || (Boolean(accessRoles) && !_.isEmpty(accessRoles) && !accessRoles?.includes(String(me?.role)))){

    return  <AccessDeniedNotice />;
  }
  //Role Validation
  // if(userLevel && me?.role && !userLevel.includes('CONSUMER') && !userLevel.includes(me?.role)){
  //   return <AccessDeniedNotice /> 
  // }
  
  //User permission validation
//   if (!hasPermissionsToViewThisPage(userPermissions, me?.userPermission)) 
//     return <AccessDeniedNotice /> 
  
  return me ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }: { children: ReactElement | null }) => {
  const me = useSelector(selectUser);
  return !me ? children : <Navigate to={'/'} />;
};
