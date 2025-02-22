import React from 'react';
import { useTranslation } from "react-i18next";
import { LangList } from "../../../../translations";
import { Popover, Paper, Avatar } from '@mui/material';

import clsx from 'clsx';

const LanguageSelector = ()=> {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'langDropdown' : undefined;
  const lang = i18n.language;
  const currentLanguage = LangList.find((x) => x.slug === lang)!;

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div aria-describedby={id}>
      <div className="headerDropdownWrapper" onClick={handleClick}>
        <span className={'dropdownMenuButton'}>
          <span className="iconBLock">
              <Avatar
                alt={`Selected language ${currentLanguage?.title}`}
                src={currentLanguage.flag || undefined}
                sx={{ width: 25, height: 25 }}
              />
          </span>
          <span className="title">{currentLanguage?.title}</span>
        </span>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper className="dropdownContent">
          <ul className="dropdownList">
            {LangList.map((language) => (
              <li
                key={language.slug}
                className={clsx('dropdownItem', { active: language.slug === currentLanguage.slug })}
              >
                <span
                  onClick={() => {
                    setLanguage(language.slug);
                  }}
                  className="dropdownLink"
                >
                  <span className="dropdownIcon">
                    {' '}
                    <img src={language.flag} alt={language.title} />{' '}
                  </span>
                  <span className="dropdownText">{language.title}</span>
                </span>
              </li>
            ))}
          </ul>
        </Paper>
      </Popover>
    </div>
  );
}

export default LanguageSelector;
