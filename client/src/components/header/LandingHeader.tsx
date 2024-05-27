import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto flex flex-wrap px-5 pt-4 flex-col md:flex-row items-center">
      <Link href={"/"} className="text-2xl text-gray-900 font-semibold">
        ShareFluence
      </Link>
      <nav className="text-gray-600 md:ml-auto flex flex-wrap gap-5 text-base justify-center">
        <a className=" hover:text-gray-900">About Us</a>
        <a className=" hover:text-gray-900">Service</a>
        <a className=" hover:text-gray-900">Contact</a>
        <a className=" hover:text-gray-900">FAQ</a>
        <Link href={"/login"} className="hover:text-gray-900">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
