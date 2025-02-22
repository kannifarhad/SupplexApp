import { memo } from "react";
import SubHeader from "./components/SubHeader";

function ContentWrapper({ children, ...rest }:{children: any, title?: string, description?: string, toolbar?: JSX.Element, iconName?: string}) {
  return (
    <>
      <SubHeader {...rest} />
      <div className="dashboardContent">{children}</div>
    </>
  );
}
export default memo(ContentWrapper);
