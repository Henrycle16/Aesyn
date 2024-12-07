"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap px-16 pt-5 flex-col md:flex-row items-center">
      <Link
        href={"/"}
        className={`${
          pathname === "/waitlist" ? "text-white" : "text-gray-900"
        } text-2xl font-semibold`}>
        aeśyn
      </Link>
    </header>
  );
};

export default Header;
