import React, { memo } from 'react';
import { Fab } from '@mui/material';
import Topbar from './Topbar';
import {
  closeSidebar,
  openSidebar,
  selectNavigation,
} from "../../../store/navigation";
import { useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";


export const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useSelector(selectNavigation);

  return (
    <div className="dashboardHeadWrap">
      <div className={`dashboardHead inlineFlexBox`}>
        <div className="dashboardHeadLeft">
          <Fab
            size="small"
            className={`cubeFab ${sidebarCollapsed ? 'active' : ''}`}
            aria-label="Toggle menu visibility"
            onClick={() => {
              console.log('sidebarCollapsed',sidebarCollapsed);
              dispatch(sidebarCollapsed ? closeSidebar() : openSidebar())
            }}
          >
            <span className={'far fa-bars'}> </span>
          </Fab>

          <a href="http://kanni.pro" target="_blank" rel="noopener noreferrer">
            <Fab size="small" className={'cubeFab'} aria-label="Go to site">
              <span className={'fad fa-globe-americas'}> </span>
            </Fab>
          </a>
          <Fab color="primary" size="small" className={'cubeFab'} aria-label="Notifications">
            <span className={'fad fa-bells'}> </span>
          </Fab>
        </div>
        <Topbar />
      </div>
    </div>
  );
}

export default memo(Header);
