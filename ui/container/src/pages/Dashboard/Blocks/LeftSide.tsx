import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../utils';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Menu from './Menu';
import { StyledSideMenu } from './styled';

function AsideLeft() {
  return (
    <StyledSideMenu className="sideMenu">
      <div className={`asideMenuContainer`}>
        <div className="asideMenuHead">
          <Link to="/">
            <img alt="Supplex" className="bigLogo" src={toAbsoluteUrl('/static/img/logos/lightLogo.svg')} />
            <img
              alt="Supplex"
              className="smallLogo"
              src={toAbsoluteUrl('/static/img/logos/lineIcon.svg')}
            />
          </Link>
        </div>
        <div className="asideMenuListWrapper">
          {/* <PerfectScrollbar options={{ wheelSpeed: 2 }}> */}
            <Menu />
          {/* </PerfectScrollbar> */}
        </div>
      </div>
    </StyledSideMenu>
  );
}

export default memo(AsideLeft);
