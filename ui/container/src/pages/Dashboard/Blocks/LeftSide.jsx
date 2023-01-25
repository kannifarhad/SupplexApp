import React from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../utils';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Menu from './Menu';

function AsideLeft() {
  return (
    <>
      <div className={`asideMenuContainer`}>
        <div className="asideMenuHead">
          <Link to="/">
            <img alt="Cronus" className="bigLogo" src={toAbsoluteUrl('/static/img/logos/lightLogo.svg')} />
            <img
              alt="Cronus"
              className="smallLogo"
              src={toAbsoluteUrl('/static/img/logos/lineIcon.svg')}
            />
          </Link>
        </div>
        <div className="asideMenuListWrapper">
          <PerfectScrollbar options={{ wheelSpeed: 2 }}>
            <Menu />
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
}

export default AsideLeft;
