"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentIcon from "@mui/icons-material/Payment";

export default function SettingTabs() {
  const pathname = usePathname();

  const activeTabStyles = "ts5-text pl-3 border-l-[3px] border-[#184465]";
  const inactiveTabStyles = "ts7-text hover:ts5-text pl-[15px] cursor-pointer";

  return (
    <nav className="w-[19rem]">
      <h1 className="mb-8 text-[32px] font-semibold"> Settings </h1>
      {/* Tabs List Container */}
      <ul className="flex flex-col gap-12">
        <li>
          <Link 
            href="/settings/account"
            className={`flex h-[3rem] items-center gap-11 ${pathname === "/settings/account" ? activeTabStyles : inactiveTabStyles}`}
          >
            <PersonOutlineOutlinedIcon fontSize="medium" />
            <p className="subheader2">My Account</p>
          </Link>
        </li>
        <li>
          <Link 
            href="/settings/billings"
            className={`flex h-[3rem] items-center gap-11 ${pathname === "/settings/billings" ? activeTabStyles : inactiveTabStyles}`}
          >
            <PaymentIcon fontSize="medium" />
            <p className="subheader2">Billing & Payments</p>
          </Link>
        </li>
        <li>
          <Link 
            href="/settings/notifications"
            className={`flex h-[3rem] items-center gap-11 ${pathname === "/settings/notifications" ? activeTabStyles : inactiveTabStyles}`}
          >
            <NotificationsNoneOutlinedIcon fontSize="medium" />
            <p className="subheader2">Notifications</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
