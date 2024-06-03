import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-gray-600 body-font md:flex-row">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          ShareFluence
        </h1>
        <p className="mb-8 leading-relaxed">
          {" "}
          Description of our product.... lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent enim lectus, facilisis in facilisis eget,
          pharetra at justo. Praesent malesuada tristique urna, at elementum
          lectus bibendum id. Integer interdum sapien nec sapien luctus, non
          elementum elit facilisis.{" "}
        </p>
        <div className="flex justify-center">
          <Link
            href={{
              pathname: "/signup",
              query: { state: true },
            }}
            className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
          >
            Join as Brand!
          </Link>
          <Link
            href={{
              pathname: "/signup",
              query: { state: false },
            }}
            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
          >
            Join as Creator!
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Image
          src="https://dummyimage.com/720x600"
          alt="hero"
          className="object-cover object-center rounded"
          width={720}
          height={600}
          priority={true}
        />
      </div>
    </section>
  );
};

export default HeroSection;
