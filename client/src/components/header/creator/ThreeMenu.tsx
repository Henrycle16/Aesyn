"use client";

import { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAppSelector } from "@/redux/store";

const ThreeMenu = () => {
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const username = useAppSelector((state) => state.profileDataReducer.value.username);

  return (
    <div className="flex space-x-10">
      <div className="relative">
        <Link
          href={`/analytics/${username}`}
          className="text-sm font-semibold text-gray-700 hover:text-[#3798E3]"
        >
          My Analytics
        </Link>
      </div>

      <Popover className="relative">
        <PopoverButton
          className={`text-sm font-semibold ${
            isReportsOpen ? "text-[#3798E3]" : "text-gray-700"
          } focus:outline-none`}
          onMouseLeave={() => setIsReportsOpen(false)}
          onClick={() => setIsReportsOpen(!isReportsOpen)}
        >
          My Campaigns
          <span className="text-gray-700">
            <ArrowDropDownIcon
              className={`h-5 w-5 transform transition-transform ${
                isReportsOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </PopoverButton>
        <Transition
          enter="duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-200 ease-out"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <PopoverPanel className="absolute z-10 mt-2 w-52 bg-white shadow-md overflow-hidden transition">
            <div className="p-2">
              <Link
                href={"#"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                style={{ transition: "background-color 0.3s, color 0.3s" }}
              >
                Overview
              </Link>
              <Link
                href={"#"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                style={{ transition: "background-color 0.3s, color 0.3s" }}
              >
                My Reports
              </Link>
              <Link
                href={"#"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                style={{ transition: "background-color 0.3s, color 0.3s" }}
              >
                Billing & Earnings
              </Link>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>

      <div className="relative">
        <Link
          href={"#"}
          className="text-sm font-semibold text-gray-700 hover:text-[#3798E3]"
        >
          Messages
        </Link>
      </div>
    </div>
  );
};

export default ThreeMenu;
