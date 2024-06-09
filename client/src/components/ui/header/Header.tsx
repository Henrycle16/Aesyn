import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-wrap px-16 pt-4 flex-col md:flex-row items-center">
      <Link href={"/"} className="text-2xl text-gray-900 font-semibold">
        ShareFluence
      </Link>
    </header>
  );
};

export default Header;