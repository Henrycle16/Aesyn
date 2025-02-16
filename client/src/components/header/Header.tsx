"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkLogo from "../svgs/DarkLogo";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap px-16 pt-5 flex-col md:flex-row items-center">
      <Link
        href={"/"}
        className={`${
          pathname === "/waitlist" ? "text-white" : "text-gray-900"
        } text-2xl font-semibold`}>
        <DarkLogo />
      </Link>
    </header>
  );
};

export default Header;
