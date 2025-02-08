import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    const today = new Date().getFullYear();
    return (
      <div className={`dashboardFooter`}>
        <div className="copyright">
          {today.toString()}&nbsp;&copy;&nbsp;
          <a href="http://kanni.pro/" rel="noopener noreferrer" target="_blank">
            Supplex
          </a>
        </div>
        <div>
          <Link to="/terms">Privacy</Link>
          <Link to="/terms">Legal</Link>
          <Link to="/terms">Contact</Link>
        </div>
      </div>
    );
  }
}

export default connect(null)(Footer);
