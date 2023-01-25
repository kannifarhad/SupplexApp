import { Trans } from "react-i18next";

const SubHeader = ()=> {
    return (
      <div className={`dashboardSubheader`}>
        <div className="title"><Trans>Dashboard</Trans></div>
        <div className="description">List Of All Posts</div>
      </div>
    );
}

export default SubHeader;
