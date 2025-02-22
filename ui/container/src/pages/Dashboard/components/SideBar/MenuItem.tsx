import React, { useRef, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem } from "@mui/material";
import { SiteRoute } from "../../../../routes/types";

interface MenuItemProps {
  item: SiteRoute;
  currentUrl: string;
  parentItem?: SiteRoute;
  userRole?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, currentUrl, userRole }) => {
  const asideLeftLIRef = useRef<HTMLLIElement | null>(null);
  const accessRole = item.accessRoles ?? [];
  const hasChildren = item.children.length > 0;

  const isMenuItemActive = useCallback(
    (menuItem: SiteRoute): boolean => {
      if (menuItem.children.length > 0) {
        return menuItem.children.some(isMenuItemActive);
      }
      return currentUrl.includes(menuItem.getPath({}));
    },
    [currentUrl]
  );

  const isActive = useMemo(
    () => isMenuItemActive(item),
    [isMenuItemActive, item]
  );

  const handleMouseClick = useCallback(() => {
    if (hasChildren && asideLeftLIRef.current) {
      asideLeftLIRef.current.classList.toggle("open");
    }
  }, [hasChildren]);

  if (
    (userRole && accessRole.length > 0 && !accessRole.includes(userRole)) ||
    !item.showInMenu
  ) {
    return null;
  }
  return (
    <ListItem
      ref={asideLeftLIRef}
      className={clsx("asideMenuItem", {
        asideMenuHasSubmenu: hasChildren,
        open: isActive && hasChildren,
        active: isActive && !hasChildren,
        iconOnly: item["icon-only"] ?? false,
      })}
    >
      {hasChildren ? (
        <>
          <ListItem
            button
            className="asideMenuToggle"
            onClick={handleMouseClick}
          >
            <div className="pseudoLink">
              <MenuItemText item={item} />
            </div>
          </ListItem>
          <MenuSubmenu item={item} currentUrl={currentUrl} />
        </>
      ) : (
        <ListItem button>
          <Link to={item.getPath({})}>
            <MenuItemText item={item} />
          </Link>
        </ListItem>
      )}
    </ListItem>
  );
};

interface MenuSubmenuProps {
  item: SiteRoute;
  currentUrl: string;
}

const MenuSubmenu: React.FC<MenuSubmenuProps> = memo(({ item, currentUrl }) => (
  <List className="asideSubmenu">
    {item.children.map((child, index) => (
      <React.Fragment key={index}>
        <MenuItem item={child} parentItem={item} currentUrl={currentUrl} />
      </React.Fragment>
    ))}
  </List>
));

const MenuItemText: React.FC<{ item: SiteRoute }> = ({ item }) => (
  <>
    {item.iconName ? (
      <i className={`asideMenuIcon fad ${item.iconName}`} />
    ) : (
      <i className="asideDot"></i>
    )}
    <span className="asideTitle"> {item.title} </span>
    {item.children.length > 0 && (
      <i className="far fa-chevron-right iconArrow" />
    )}
  </>
);

export default memo(MenuItem);
