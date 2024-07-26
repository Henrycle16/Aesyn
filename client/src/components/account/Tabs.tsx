"use client";

import MenuList from "@mui/material/MenuList";
import { ListItemIcon, MenuItem } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentIcon from '@mui/icons-material/Payment';

export default function SettingTabs() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold text-[#184465]"> Settings </h1>
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem className="py-3 mb-8 border-l-4 border-solid g5-border g5-text subheader1">
          <ListItemIcon>
            <PersonOutlineOutlinedIcon className="g5-text" fontSize="medium" />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem className="py-3 mb-8 border-l-4 border-solid g5-border g5-text subheader1">
          <ListItemIcon>
            <PaymentIcon className="g5-text" fontSize="medium"/>
          </ListItemIcon>
          Billings & Payments
        </MenuItem>
        <MenuItem className="py-3 mb-8 border-l-4 border-solid g5-border g5-text subheader1">
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon className="g5-text" fontSize="medium"/>
          </ListItemIcon>
          Notifications
        </MenuItem>
      </MenuList>
    </div>
  );
}
