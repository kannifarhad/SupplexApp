import React from 'react';
import { connect } from 'react-redux';
// import LeftSide from './Blocks/LeftSide';
// import Header from './Blocks/Header';
import Footer from './Blocks/Footer';
import clsx from 'clsx';

function DashboardWrapp({ component: Component, showMenu, ...rest }) {
  return (
    <div className={`dashboardWrapp ` + clsx({ sideMenuMimimise: !showMenu })}>
      <div className="sideMenu">
        {/* <LeftSide /> */}
      </div>
      <div className="dashboardContainer">
        {/* <Header /> */}
        <div className="dashboardContent container">
          <Component {...rest} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
const mapStateToProps = (store, props) => ({
  showMenu: store.dashboard.showMenu,
  ...props,
});

export default connect(mapStateToProps, null)(DashboardWrapp);
