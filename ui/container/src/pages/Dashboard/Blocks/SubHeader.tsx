import { Trans } from "react-i18next";

const SubHeader = ({ title, description })=> {
    const titleParsed = <Trans>{title ?? "Dashboard"}</Trans>;
    const descriptionParsed = <Trans>{description ?? "Wellcome to Supplex dashboard"}</Trans>;
    return (
      <div className={`dashboardSubheader`}>
        <div className="title">{titleParsed}</div>
        <div className="description">{descriptionParsed}</div>
      </div>
    );
}

export default SubHeader;
