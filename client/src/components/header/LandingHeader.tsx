import Link from "next/link";

const Header = () => {
  return (
    <header className="flex px-12 py-5 flex-col md:flex-row border-[1px] border-stone-600 rounded-2xl mt-5 mx-5 items-center backdrop-blur-sm">
      <Link href={"/"} className="text-2xl font-semibold">
        ShareFluence
      </Link>
      <nav className="md:ml-auto flex flex-wrap gap-x-16">
        <a href="#section1" className="">
          Section 1
        </a>
        <a href="#section2" className="">
          Section 2
        </a>
        <a href="#section3" className="">
          Section 3
        </a>
      </nav>
    </header>
  );
};

export default Header;
