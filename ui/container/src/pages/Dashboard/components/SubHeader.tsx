import { Trans } from "react-i18next";
import { StyledDashboardSubHeader } from "./styled";

const SubHeader = ({
  title,
  description,
  iconName,
  toolbar,
}: {
  title?: string;
  description?: string;
  iconName?: string;
  toolbar?: JSX.Element;
}) => {
  const titleParsed = <Trans>{title ?? "Dashboard"}</Trans>;
  const descriptionParsed = (
    <Trans>{description ?? "Wellcome to Supplex dashboard"}</Trans>
  );
  return (
    <StyledDashboardSubHeader>
      <div className="subHeaderInfo">
        <div className="title">{iconName && <span className={`icon fad ${iconName}`} />}{titleParsed}</div>
        <div className="description">{descriptionParsed}</div>
      </div>
      <div className="subHeaderToolbar">
        {toolbar}
      </div>
    </StyledDashboardSubHeader>
  );
};

export default SubHeader;
