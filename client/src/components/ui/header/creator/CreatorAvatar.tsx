"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/store";
import { resetProfileData } from "@/redux/slices/profileData-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const CreatorAvatar: React.FC = () => {
  // State to manage popover visibility
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const session = useSession();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const firstName = useAppSelector((state) => state.profileDataReducer.value.firstName);
  const lastName = useAppSelector((state) => state.profileDataReducer.value.lastName);
  const email = useAppSelector((state) => state.profileDataReducer.value.email);

  useEffect(() => {
    if (session.data && session.status === "authenticated") {
    } else {
      redirect("/login");
    }
  }, [dispatch, session.data, session.status]);

  // redux store
  const authStore = useAppSelector(
    (state) => state.authReducer.value
  );

  const handleSignOut = () => {
    dispatch(resetProfileData());
    signOut({ redirect: true, callbackUrl: "/" });
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    router.push("/settings/account")
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  return (
    <div className="flex items-center">
      <Stack direction="row" spacing={1}>
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
        <Avatar onClick={handleClick} className="cursor-pointer" />
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
          <Typography variant="subtitle1">{authStore.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            {authStore.email}
          </Typography>
        </Box>
        <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
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
