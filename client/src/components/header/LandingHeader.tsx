import { RefObject } from "react";

interface LandingHeaderProps {
  currentSection: string | null;
  refs: {
    showcaseRef: RefObject<HTMLDivElement>;
    bentoboxRef: RefObject<HTMLDivElement>;
    carouselRef: RefObject<HTMLDivElement>;
  };
}

const LandingHeader = ({ currentSection, refs }: LandingHeaderProps) => {
  const scrollToSection = (section: keyof typeof refs) => {
    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isActive = (section: string) => currentSection === section;

  return (
    <header className="flex px-12 py-5 flex-col md:flex-row border-[1px] border-stone-600 rounded-2xl mt-5 mx-5 items-center backdrop-blur-sm">
      <div className="text-2xl font-semibold">ShareFluence</div>

      <nav className="md:ml-auto flex flex-wrap gap-x-16">
        <button
          onClick={() => scrollToSection("showcaseRef")}
          className={`${isActive("showcase") ? "font-bold" : ""}`}>
          Showcase
        </button>
        <button
          onClick={() => scrollToSection("bentoboxRef")}
          className={`${isActive("bentobox") ? "font-bold" : ""}`}>
          Bento Box
        </button>
        <button
          onClick={() => scrollToSection("carouselRef")}
          className={`${isActive("carousel") ? "font-bold" : ""}`}>
          Carousel
        </button>
        <a href="/login" className="hover:text-gray-900">
          Login
        </a>
      </nav>
    </header>
  );
};

export default LandingHeader;
