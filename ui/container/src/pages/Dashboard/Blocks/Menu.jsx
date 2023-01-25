import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import menuData from './MenuConfig';
import { List, ListItem } from '@mui/material';
import _ from "lodash";

const MenuBar = ()=>{
  const { pathname } = useLocation();
  return (
    <div className='asideMenuCont'>
      <List className="asideMenuUl">
        <MenuList currentUrl={pathname} menuConfig={menuData} />
      </List>
    </div>
  );
}

export default MenuBar;

function MenuList(props) {
  const { currentUrl, menuConfig } = props;
  return menuConfig.aside.items.map((child, index) => {
    return (
      <React.Fragment key={`menuList${index}`}>
        {child.title && <MenuItem item={child} currentUrl={currentUrl} />}
      </React.Fragment>
    );
  });
}

function MenuItem(props) {
  const asideLeftLIRef = React.createRef();
  const isDropdown = document.body.classList.contains('isDropdown');
  const { item, currentUrl, parentItem } = props;

  const submenuToggle =
    props.item.toggle === 'click'
      ? 'click'
      : _.get(props.item, 'submenu.type') === 'tabs'
      ? 'tabs'
      : 'hover';

  const operations = {
    mouseClick: (item) => {
      if (props.item.submenu) {
        if (asideLeftLIRef.current.classList.contains('open')) {
          asideLeftLIRef.current.classList.remove('open');
        } else {
          asideLeftLIRef.current.classList.add('open');
        }
      }
    },

    mouseEnter: (event) => {
      if (!isDropdown) {
        return;
      }

      if (props.item.submenu) {
        asideLeftLIRef.current.classList.add('kt-menu__item--hover');
        asideLeftLIRef.current.setAttribute('data-ktmenu-submenu-toggle', submenuToggle);
      }
    },

    mouseLeave: (event) => {
      if (!isDropdown) {
        return;
      }

      if (props.item.submenu && submenuToggle === 'hover') {
        asideLeftLIRef.current.classList.remove('kt-menu__item--hover');
        asideLeftLIRef.current.removeAttribute('data-ktmenu-submenu-toggle');
      }
    },

    isMenuItemIsActive: (item) => {
      if (item.submenu) {
        return operations.isMenuRootItemIsActive(item);
      }

      if (!item.page) {
        return false;
      }

      return props.currentUrl.indexOf(item.page) !== -1;
    },

    isMenuRootItemIsActive: (item) => {
      for (const subItem of item.submenu) {
        if (operations.isMenuItemIsActive(subItem)) {
          return true;
        }
      }

      return false;
    },
  };

  const isActive = operations.isMenuItemIsActive(item);

  return (
    <ListItem
      ref={asideLeftLIRef}
      onMouseEnter={operations.mouseEnter}
      onMouseLeave={operations.mouseLeave}
      className={clsx('asideMenuItem', {
        asideMenuHasSubmenu: item.submenu,
        open: isActive && item.submenu,
        active: isActive && !item.submenu,
        iconOnly: item['icon-only'],
      })}
    >
      {!item.submenu && (
        <ListItem button>
          <Link to={`/${item.page}`}>
            <MenuItemText item={item} parentItem={parentItem} />
          </Link>
        </ListItem>
      )}

      {item.submenu && (
        <>
          <ListItem button className="asideMenuToggle" onClick={operations.mouseClick}>
            <div className="pseudoLink">
              <MenuItemText item={item} parentItem={parentItem} />
            </div>
          </ListItem>
          <MenuSubmenu item={item} parentItem={item} currentUrl={currentUrl} />
        </>
      )}
    </ListItem>
  );
}

function MenuSubmenu(props) {
  const { item, currentUrl } = props;
  return (
    <List className="asideSubmenu">
      {item.submenu.map((child, index) => (
        <React.Fragment key={index}>
          {child.title && <MenuItem item={child} parentItem={item} currentUrl={currentUrl} />}
        </React.Fragment>
      ))}
    </List>
  );
}

function MenuItemText(props) {
  const { item } = props;
  return (
    <>
      {item.icon ? <i className={`asideMenuIcon ${item.icon}`} /> : <i className="asideDot"></i>}
      <span className="asideTitle"> {item.title} </span>
      {item.submenu && <i className="icon-next iconArrow" />}
    </>
  );
}
