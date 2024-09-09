import Link from "next/link";

const Header = () => {
  return (
    <header className="flex px-12 py-5 flex-col md:flex-row border-[1px] border-stone-600 rounded-2xl mt-5 mx-5 items-center backdrop-blur-sm">
      <Link href={"/"} className="text-2xl font-semibold">
        ShareFluence
      </Link>

      <nav className="md:ml-auto flex flex-wrap gap-x-16">
        <a href="#showcase" className="">
          Showcase
        </a>
        <a href="#bentobox" className="">
          Bento Box
        </a>
        <a href="#carousel" className="">
          Carousel
        </a>
        <Link href={"/login"} className="hover:text-gray-900">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
