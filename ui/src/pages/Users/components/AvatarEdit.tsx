import * as React from "react";
import { IconButton, Badge, ListItemText, ListItemButton, ListItem, List, Popover, Avatar } from "@mui/material";

const AvatarEdit = ({ src, onChange, size = 60 }) => {
  const [avatarEl, setAvatarEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const open = Boolean(avatarEl);
  const id = open ? "simpe-popover" : undefined;

  return (
    <>
       <IconButton aria-describedby={id} onClick={handleAvatarClick}>
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <span
              className="editIcon fad fa-pen"
              style={{
                fontSize: "10px",
                left: "-15px",
                top: "-15px",
                background: "#0692F2",
                color:"#fff",
                border:"1px solid rgb(231 240 254)",
                padding: "8px",
                borderRadius: "50%",
              }}
            />
          }
        >
          <Avatar src={src} style={{ width: size, height: size }} />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onChange("")}>
              <ListItemText primary="Delete image" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Choose new image" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default AvatarEdit;
