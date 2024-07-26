"use client";

import { useState } from "react";
import MenuList from "@mui/material/MenuList";
import { List, ListItemIcon, ListItemButton } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentIcon from "@mui/icons-material/Payment";

export default function SettingTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold text-[#184465]"> Settings </h1>
      <List
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <ListItemButton
          className="py-3 mb-8 g5-text subheader1"
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{
            "&.Mui-selected": {
              borderLeft: 4,
            },
          }}
        >
          <ListItemIcon>
            <PersonOutlineOutlinedIcon className="g5-text" fontSize="medium" />
          </ListItemIcon>
          My Account
        </ListItemButton>
        <ListItemButton
          className="py-3 mb-8 g5-text subheader1"
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={{
            "&.Mui-selected": {
              borderLeft: 4,
            },
          }}
        >
          <ListItemIcon>
            <PaymentIcon className="g5-text" fontSize="medium" />
          </ListItemIcon>
          Billings & Payments
        </ListItemButton>
        <ListItemButton
          className="py-3 mb-8 g5-text subheader1"
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{
            "&.Mui-selected": {
              borderLeft: 4,
            },
          }}
        >
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon
              className="g5-text"
              fontSize="medium"
            />
          </ListItemIcon>
          Notifications
        </ListItemButton>
      </List>
    </>
  );
}
