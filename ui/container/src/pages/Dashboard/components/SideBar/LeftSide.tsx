import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../utils';
import Menu from './Menu';
import { StyledSideMenu, StyledSideBarHead } from './styled';
import { useSelector } from 'react-redux';
import { selectSideBar } from 'src/store/dashboard';

function AsideLeft() {
    const sidebarCollapsed  = useSelector(selectSideBar);
  return (
    <StyledSideMenu sidebarCollapsed={sidebarCollapsed}>
      <div className={`asideMenuContainer`}>
        <StyledSideBarHead sidebarCollapsed={sidebarCollapsed}>
          <Link to="/">
            <img alt="Supplex" className="bigLogo" src={toAbsoluteUrl('/static/img/logos/lightLogo.svg')} />
            <img alt="Supplex" className="smallLogo" src={toAbsoluteUrl('/static/img/logos/lineIcon.svg')} />
          </Link>
        </StyledSideBarHead>
        <div className="asideMenuListWrapper">
            <Menu />
        </div>
      </div>
    </StyledSideMenu>
  );
}

export default memo(AsideLeft);
