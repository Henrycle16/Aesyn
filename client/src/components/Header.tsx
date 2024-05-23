import Link from "next/link";

const Header = () => {
  return (
      <header className="container text-gray-600 mx-auto flex flex-wrap px-5 pt-4 flex-col md:flex-row items-center">
        <Link href={"/"}>
          <div className="flex title-font font-medium gap-3 items-center text-gray-900 ">
            {/* TODO: Move svg into its own file */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="w-20 h-20 text-black p-2 bg-gray-200 rounded"
              viewBox="8 2 50 55"
            >
              <path
                className="m-4 grid grid-flow-col gap-4 p-5"
                d="M47.9,24.3c0-0.1,0-0.2,0-0.3c0-8.4-6.8-15.3-15.3-15.3c-7.4,0-13.6,5.3-15,12.3c-8.6,0.2-14.9,9.4-10,18.5  c1.9,3.4,5.5,5.5,9.4,5.5h31.3c3.3,0,6.4-1.7,8-4.6C60.8,32.5,55.4,24.5,47.9,24.3z"
              />
              <g>
                <circle className="st2" cx="33" cy="23" r="8" />
              </g>
              <path className="st6" d="M36,20h-1c-1.1,0-2,0.9-2,2v7" />
              <line className="st6" x1="36" x2="31" y1="24" y2="24" />
              <g>
                <circle className="st2" cx="47" cy="35" r="6" />
              </g>
              <path
                className="st1"
                d="M49.6,34.7l-3.8-2.2c-0.2-0.1-0.4,0-0.4,0.3v4.4c0,0.2,0.2,0.4,0.4,0.3l3.8-2.2C49.8,35.1,49.8,34.9,49.6,34.7z  "
              />
              <g>
                <circle className="st2" cx="18" cy="33" r="7" />
              </g>
              <path
                className="st0"
                d="M17.9,32.1c0-0.1,0-0.3,0-0.4c0-0.5,0.4-1.1,0.9-1.2c0.6-0.2,1.1-0.1,1.5,0.3c0,0,0.1,0,0.1,0  c0.3-0.1,0.5-0.2,0.8-0.3c0,0,0,0,0.1,0c-0.1,0.3-0.3,0.6-0.6,0.8c0.3,0,0.5-0.1,0.8-0.2c0,0,0,0,0,0c-0.1,0.1-0.2,0.3-0.3,0.4  c-0.1,0.1-0.2,0.2-0.3,0.3c0,0,0,0.1,0,0.1c0,0.9-0.2,1.8-0.8,2.5c-0.6,0.9-1.5,1.4-2.5,1.6c-0.8,0.1-1.5,0.1-2.2-0.2  c-0.3-0.1-0.5-0.2-0.8-0.4c0.8,0.1,1.5-0.1,2.1-0.6c-0.7-0.1-1.1-0.4-1.3-1c0.2,0,0.4,0,0.6,0c-0.4-0.1-0.7-0.3-1-0.7  c-0.1-0.2-0.2-0.5-0.2-0.7c0.2,0.1,0.4,0.2,0.6,0.2c-0.3-0.2-0.5-0.5-0.6-0.9c-0.1-0.4,0-0.7,0.2-1C15.8,31.5,16.7,32,17.9,32.1z"
              ></path>
            </svg>
            <div className="text-xl">H2JC</div>
          </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap gap-5 text-base justify-center">
          <Link href="/">
            <div className=" hover:text-gray-900">Home</div>
          </Link>
          <a className=" hover:text-gray-900">About Us</a>
          <a className=" hover:text-gray-900">Service</a>
          <a className=" hover:text-gray-900">Contact</a>
          <a className=" hover:text-gray-900">FAQ</a>
          <Link href={"/login"}>
              <div className=" hover:text-gray-900">Login</div>
            </Link>
        </nav>
      </header>
  );
};

export default Header;
