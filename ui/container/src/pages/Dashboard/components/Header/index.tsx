import { memo } from 'react';
import Topbar from './Topbar';
import { closeSidebar, openSidebar, selectSideBar } from "src/store/dashboard";
import { useAppDispatch } from "src/store";
import { useSelector } from "react-redux";
import ThemeModeSwitch from './ThemeModeSwitch';
import FabButton from 'src/components/Elements/FabButton';
import LanguageSelector from './LanguageSelector';
import { Link } from 'react-router-dom';
import { StyledDashboardHeader } from './styled';


export const Header = () => {
  const dispatch = useAppDispatch();
  const sidebarCollapsed  = useSelector(selectSideBar);

  return (
    <StyledDashboardHeader sidebarCollapsed={sidebarCollapsed}>
      <div className="dashboardHead">
        <div className="dashboardHeadLeft">
          <FabButton title="Toggle sidebar" onClick={() =>dispatch(sidebarCollapsed ? closeSidebar() : openSidebar())} icon={<span className='far fa-bars' />} />
          <Link to="/" ><FabButton title="Go to dasboard" icon={<span className='fad fa-gauge-max'/>} /></Link>
          <FabButton title="Notifications" icon={<span className='fad fa-bells'/>} />
          <ThemeModeSwitch />
          <LanguageSelector />
        </div>
        <Topbar />
      </div>
    </StyledDashboardHeader>
  );
}

export default memo(Header);
