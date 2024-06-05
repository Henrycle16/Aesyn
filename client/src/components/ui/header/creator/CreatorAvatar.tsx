"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import { ListItemIcon, MenuItem } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const CreatorAvatar: React.FC = () => {
  // State to manage popover visibility
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  return (
    <div className="flex items-center">
      <Stack direction="row" spacing={2}>
        <Tooltip title="Help">
          <IconButton className="text-gray-700">
            <HelpOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton className="text-gray-700">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Avatar onClick={handleClick} />
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: 200, vertical: 'top' }}
        slotProps={{ paper: { sx: { width: "240px" } } }}
      >
        <Box sx={{ p: "16px 20px " }}>
          {/* Will need to add logic that pulls user name and email from the database */}
          <Typography variant="subtitle1">Hello World</Typography>
          <Typography color="text.secondary" variant="body2">
            I.am.Caorin@gm.com
          </Typography>
        </Box>
        <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
      </Popover>
    </div>
  );
};

export default CreatorAvatar;
