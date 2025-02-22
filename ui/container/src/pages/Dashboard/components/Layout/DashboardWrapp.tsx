import { memo } from "react";
import LeftSide from "../SideBar/LeftSide";
import Header from "../Header";
import Footer from "./Footer";
import { StyledDashboardContainer, StyledDashboardWraper } from "./styled";

function DashboardWrapp({ children }) {
  return (
    <StyledDashboardWraper>
      <LeftSide />
      <StyledDashboardContainer>
        <Header />
        <div className="dashboardContentWrapper">{children}</div>
        <Footer />
      </StyledDashboardContainer>
    </StyledDashboardWraper>
  );
}
export default memo(DashboardWrapp);
