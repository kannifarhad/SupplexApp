import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translate } from '../../../utils';

class SubHeader extends React.Component {
  render() {
    return (
      <div className={`dashboardSubheader`}>
        <div className="title"><Translate>Dashboard</Translate></div>
        <div className="description">List Of All Posts</div>
      </div>
    );
  }
}

export default withRouter(connect(null)(SubHeader));
