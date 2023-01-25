import React from 'react';
import LanguageSelector from './LanguageSelector';
import UserProfile from './UserProfile';

const TopBar = ()=>{
  return (
    <div className="dashboardHeadRight">
      <LanguageSelector />
      <UserProfile />
    </div>
  );
}

export default TopBar;