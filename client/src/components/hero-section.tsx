import React from 'react';
import Link from 'next/link';



const HeroSection = () => {
    return (
        <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Title of our product
            </h1>
            <p className="mb-8 leading-relaxed"> Description of our product.... lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim lectus, facilisis in facilisis eget, pharetra at justo. Praesent malesuada tristique urna, at elementum lectus bibendum id. Integer interdum sapien nec sapien luctus, non elementum elit facilisis. </p>
            <div className="flex justify-center">
              <Link href="/signup">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Join as Brand!</button> 
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Join as Creator!</button> </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"></img>
          </div>
        </div>
      </section>
    )
}

export default HeroSection