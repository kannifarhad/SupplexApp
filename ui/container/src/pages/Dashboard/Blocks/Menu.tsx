import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import menuData from './MenuConfig';
import { List, ListItem } from '@mui/material';
import _ from "lodash";
import { SidebarRoutes } from '../../../routes';
import { SiteRoute } from '../../../routes/types';

const MenuBar = ()=>{
  const { pathname}  = useLocation();
  return (
    <div className='asideMenuCont'>
      <List className="asideMenuUl">
        {
            Object.entries(SidebarRoutes)
                .map(([index, item]) => (
                      <React.Fragment key={`menuList${index}`}>
                        <MenuItem item={item} currentUrl={pathname} />
                      </React.Fragment>
                    )
                  )
        }
      </List>
    </div>
  );
}

const MenuItem = ({ item, currentUrl, parentItem }: { item: SiteRoute, currentUrl: string, parentItem?: SiteRoute  }) =>{
  // console.log('MenuItem',item);
  const asideLeftLIRef = useRef<any>();
  
  const operations = {
    mouseClick: (item) => {
      console.log(item.children);
      if (item.children.length > 0) {
        if (asideLeftLIRef.current.classList.contains('open')) {
          asideLeftLIRef.current.classList.remove('open');
        } else {
          asideLeftLIRef.current.classList.add('open');
        }
      }
    },
    isMenuItemIsActive: (item) => {
      if (item.children.length > 0) {
        return operations.isMenuRootItemIsActive(item);
      }
      // if (!) {
      //   return false;
      // }
      return currentUrl.indexOf(item.getPath({})) !== -1;
    },

    isMenuRootItemIsActive: (item) => {
      for (const subItem of item.children) {
        if (operations.isMenuItemIsActive(subItem)) {
          return true;
        }
      }
      return false;
    },
  };

  const isActive = operations.isMenuItemIsActive(item);
  const hasChildren = item.children.length > 0;

  return (
    <ListItem
      ref={asideLeftLIRef}
      className={clsx('asideMenuItem', {
        asideMenuHasSubmenu: hasChildren,
        open: isActive && hasChildren,
        active: isActive && !hasChildren,
        iconOnly: item['icon-only'],
      })}
    >
      {hasChildren ?
        <>
          <ListItem button className="asideMenuToggle" onClick={()=>operations.mouseClick(item)}>
            <div className="pseudoLink">
              <MenuItemText item={item} />
            </div>
          </ListItem>
          <MenuSubmenu item={item} parentItem={item} currentUrl={currentUrl} />
        </>
        :
          <ListItem button>
            <Link to={item.getPath({})}>
              <MenuItemText item={item} />
            </Link>
          </ListItem>
      }
    </ListItem>
  );
}

function MenuSubmenu(props) {
  const { item, currentUrl } = props;
  return (
    <List className="asideSubmenu">
      {item.children.map((child, index) => (
        <React.Fragment key={index}>
          <MenuItem item={child} parentItem={item} currentUrl={currentUrl} />
        </React.Fragment>
      ))}
    </List>
  );
}

function MenuItemText({ item }) {
  return (
    <>
      {item.iconName ? <i className={`asideMenuIcon fad ${item.iconName}`} /> : <i className="asideDot"></i>}
      <span className="asideTitle"> {item.title} </span>
      {item.children.length > 0 && <i className="far fa-chevron-right iconArrow" />}
    </>
  );
}

export default MenuBar;