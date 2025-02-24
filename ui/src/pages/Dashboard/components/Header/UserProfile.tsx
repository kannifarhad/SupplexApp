import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toAbsoluteUrl } from '../../../../utils';
import { useAppDispatch } from "../../../../store";
import { Popover, List, ListItem, Avatar } from '@mui/material';
import { Trans } from "react-i18next";
import { logout, selectUser } from "../../../../store/auth";

function UserProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const user = useSelector(selectUser);
  const id = open ? 'profileDropdown' : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div aria-describedby={id}>
      <div className="headerUser">
        <div className="userBar" onClick={handleClick}>
          <div className="userWellcome">
            <span><Trans>Hi,</Trans></span>
            <span>{user?.firstname}</span>
          </div>
          <Avatar
            alt="Profile picture"
            src={user?.photo || undefined}
            sx={{ width: 24, height: 24 }}
          />
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={handleClick}
        >
          <div className="userDropdownMenu">
            <div
              className="userCardCover"
              style={{ backgroundImage: `url(${toAbsoluteUrl('/static/img/loginBg.jpg')})` }}
            >
              <div className="userCardPhoto">
                <Avatar
                  alt="Profile picture"
                  src={user?.photo || undefined}
                  sx={{ width: 75, height: 75 }}
                />
              </div>
              <div className="userCardName">{user?.firstname} - {user?.lastname}</div>
            </div>

            <List className="notifications" component="nav">
              <ListItem button className="notificationsItem">
                <Link to={`/profile`}>
                  <div className="notificationsIcon">
                    <i className="fad fa-user greenText" />
                  </div>
                  <div className="text">
                    <h4><Trans>My Profile</Trans></h4>
                    <p><Trans>Account settings and more</Trans></p>
                  </div>
                  <span className="notifArrow icon-next" />
                </Link>
              </ListItem>

              <ListItem button className="notificationsItem">
                <Link to="/messenger">
                  <div className="notificationsIcon">
                    <i className="fad fa-comments-alt" />
                  </div>
                  <div className="text">
                    <h4><Trans>My Messages</Trans></h4>
                    <p><Trans>Write or view your inbox messages</Trans></p>
                  </div>
                  <span className="notifArrow icon-next" />
                </Link>
              </ListItem>

              <ListItem className="notificationsItem" >
                <button onClick={() => dispatch(logout(false, false))} style={{ cursor: "pointer" }}>
                  <div className="notificationsIcon">
                    <i className="fad fa-sign-out redText" />
                  </div>
                  <div className="text">
                    <h4><Trans>Sign Out</Trans></h4>
                    <p><Trans>Your session will be ended</Trans></p>
                  </div>
                  <span className="notifArrow icon-next" />
                </button>
              </ListItem>
            </List>
          </div>
        </Popover>

      </div>
    </div>
  );
}


export default UserProfile;
