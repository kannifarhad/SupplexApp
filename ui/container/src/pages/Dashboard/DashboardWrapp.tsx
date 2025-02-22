import { memo } from "react";
import LeftSide from "./components/SideBar/LeftSide";
import Header from "./components/Header";
import Footer from "./components/Footer";

function DashboardWrapp({ children }) {
  return (
    <div className="dashboardWrapp">
      <LeftSide />
      <div className="dashboardContainer">
        <Header />
        <div className="dashboardContentWrapper">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
export default memo(DashboardWrapp);
