'use client'
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleBrandSignup = () => {
    router.push(`/signup?state=${true}`);
  };

  const handleCreatorSignup = () => {
   router.push(`/signup?state=${false}`);
  };

    return (
        <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Sharefluence
            </h1>
            <p className="mb-8 leading-relaxed">We are redefining digital marketing by seamlessly connecting brands with creators utilizing cutting-edge AI for optimal collaborations. We empower businesses, regardless of size, with insightful metrics and help facilitate informed decisions. Within our dynamic ecosystem, we cultivate meaningful connections that drive success for both brands and creators in the ever-growing landscape of social media. </p>
            <div className="flex justify-center">
              <button onClick={handleBrandSignup} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Join as Brand!</button>
              <button onClick={handleCreatorSignup} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Join as Creator!</button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://source.unsplash.com/random"></img>
          </div>
        </div>
      </section>
    )
}

export default HeroSection