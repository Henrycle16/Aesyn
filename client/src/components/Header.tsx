import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"}>
          <div className="flex title-font font-medium items-center text-gray-900 mb-5 md:mb-0">
            <div className="ml-3 text-xl">Sharefluence</div>
          </div>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">About Us</a>
            <a className="mr-5 hover:text-gray-900">Service</a>
            <a className="mr-5 hover:text-gray-900">Contact</a>
            <a className="mr-5 hover:text-gray-900">FAQ</a>
            <Link href={"/login"}>
              <div className="mr-5 hover:text-gray-900">Login</div>
            </Link>
          </nav>
        </div>
      </header>
    )
}

export default Header;
