import React, {  memo} from "react";
import { useLocation,  } from "react-router-dom";
import { List } from "@mui/material";
import { SidebarRoutes } from "../../../../routes";
import { selectUser } from "../../../../store/auth";
import { useSelector } from "react-redux";
import { StyledSideMenuCont } from "./styled";
import { selectSideBar } from "src/store/dashboard";
import { classNames } from "src/utils/classNames";
import MenuItem from "./MenuItem";

const MenuBar = () => {
  const { pathname } = useLocation();
  const me = useSelector(selectUser);
  const sidebarCollapsed  = useSelector(selectSideBar);

  return (
    <StyledSideMenuCont sidebarCollapsed={sidebarCollapsed} className={classNames({"sideMenuMimimise": !sidebarCollapsed})}>
      <List className="asideMenuUl">
        {Object.entries(SidebarRoutes).map(([index, item]) => (
          <React.Fragment key={`menuList${index}`}>
            <MenuItem item={item} currentUrl={pathname} userRole={me?.role} />
          </React.Fragment>
        ))}
      </List>
    </StyledSideMenuCont>
  );
};

export default memo(MenuBar);