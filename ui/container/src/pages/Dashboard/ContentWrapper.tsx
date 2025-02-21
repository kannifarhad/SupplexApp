import { memo } from "react";
import SubHeader from "./Blocks/SubHeader";

function ContentWrapper({ children, title, description, toolbar }:{children: any, title?: string, description?: string, toolbar?: JSX.Element}) {
  return (
    <>
      <SubHeader title={title} description={description} toolbar={toolbar} />
      <div className="dashboardContent">{children}</div>
    </>
  );
}
export default memo(ContentWrapper);
