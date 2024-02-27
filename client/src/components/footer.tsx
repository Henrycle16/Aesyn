import React from 'react';

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="w-20 h-20 text-white p-2 bg-blue-500 rounded" viewBox="8 2 50 55">
              <path className="m-4 grid grid-flow-col gap-4 p-5"  d="M47.9,24.3c0-0.1,0-0.2,0-0.3c0-8.4-6.8-15.3-15.3-15.3c-7.4,0-13.6,5.3-15,12.3c-8.6,0.2-14.9,9.4-10,18.5  c1.9,3.4,5.5,5.5,9.4,5.5h31.3c3.3,0,6.4-1.7,8-4.6C60.8,32.5,55.4,24.5,47.9,24.3z"/><g><circle className="st2" cx="33" cy="23" r="8"/></g><path className="st6" d="M36,20h-1c-1.1,0-2,0.9-2,2v7"/><line className="st6" x1="36" x2="31" y1="24" y2="24"/><g><circle className="st2" cx="47" cy="35" r="6"/></g><path className="st1" d="M49.6,34.7l-3.8-2.2c-0.2-0.1-0.4,0-0.4,0.3v4.4c0,0.2,0.2,0.4,0.4,0.3l3.8-2.2C49.8,35.1,49.8,34.9,49.6,34.7z  "/><g><circle className="st2" cx="18" cy="33" r="7"/></g><path className="st0" d="M17.9,32.1c0-0.1,0-0.3,0-0.4c0-0.5,0.4-1.1,0.9-1.2c0.6-0.2,1.1-0.1,1.5,0.3c0,0,0.1,0,0.1,0  c0.3-0.1,0.5-0.2,0.8-0.3c0,0,0,0,0.1,0c-0.1,0.3-0.3,0.6-0.6,0.8c0.3,0,0.5-0.1,0.8-0.2c0,0,0,0,0,0c-0.1,0.1-0.2,0.3-0.3,0.4  c-0.1,0.1-0.2,0.2-0.3,0.3c0,0,0,0.1,0,0.1c0,0.9-0.2,1.8-0.8,2.5c-0.6,0.9-1.5,1.4-2.5,1.6c-0.8,0.1-1.5,0.1-2.2-0.2  c-0.3-0.1-0.5-0.2-0.8-0.4c0.8,0.1,1.5-0.1,2.1-0.6c-0.7-0.1-1.1-0.4-1.3-1c0.2,0,0.4,0,0.6,0c-0.4-0.1-0.7-0.3-1-0.7  c-0.1-0.2-0.2-0.5-0.2-0.7c0.2,0.1,0.4,0.2,0.6,0.2c-0.3-0.2-0.5-0.5-0.6-0.9c-0.1-0.4,0-0.7,0.2-1C15.8,31.5,16.7,32,17.9,32.1z"></path>
            </svg>
            <span className="ml-3 text-xl">H2JC</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 H2JC —
            <a className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Henry Nguyen, Henry Le, Calvin Nguyen, Justin Talictic</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    );
};

export default Footer;