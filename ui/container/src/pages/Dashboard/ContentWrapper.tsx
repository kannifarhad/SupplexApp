import { memo } from "react";
import SubHeader from "./Blocks/SubHeader";

function ContentWrapper({ children, title, description }) {
  return (
    <>
      <SubHeader title={title} description={description} />
      <div className="dashboardContent">{children}</div>
    </>
  );
}
export default memo(ContentWrapper);
