import React, { memo } from "react";
import LeftSide from "./Blocks/LeftSide";
import Header from "./Blocks/Header";
import Footer from "./Blocks/Footer";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectNavigation } from "../../store/navigation";

function DashboardWrapp({ children }) {
  const { sidebarCollapsed } = useSelector(selectNavigation);
  return (
    <div
      className={clsx("dashboardWrapp", {
        sideMenuMimimise: !sidebarCollapsed,
      })}
    >
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
