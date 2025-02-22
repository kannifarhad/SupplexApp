import { memo } from "react";
import SubHeader from "../SubHeader";
import { StyledDashboardContent } from "./styled";

function ContentWrapper({ children, ...rest }:{children: any, title?: string, description?: string, toolbar?: JSX.Element, iconName?: string}) {
  return (
    <>
      <SubHeader {...rest} />
      <StyledDashboardContent>{children}</StyledDashboardContent>
    </>
  );
}
export default memo(ContentWrapper);
