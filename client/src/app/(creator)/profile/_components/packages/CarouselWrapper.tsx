import { Children, ReactElement, ReactNode } from "react";
import Carousel from "react-multi-carousel";
import {
  ButtonGroupProps,
  ArrowProps,
  DotProps,
} from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";
import "./carousel.css";

type Props = {
  children: typeof Children | ReactElement | ReactNode;
};

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomButtonGroupAsArrows = ({
  next,
  previous,
  className,
}: CarouselButtonGroupProps) => {
  return (
    <div className={className}>
      <button onClick={previous} className="custom-left-arrow">
        <span className="custom-left-arrow-icon self-center ml-1"></span>
      </button>
      <button onClick={next} className="custom-right-arrow">
        <span className="custom-right-arrow-icon mr-1"></span>
      </button>
    </div>
  );
};

const CarouselWrapper = ({ children }: Props) => {
  const arrowstyle =Array.isArray(children) && children.length < 4 ? "hidden" : "";

  const CustomDots = ({ active, onClick }: DotProps) => {
    const dotActive = active ? "custom-dot--active " : "";
    return (
      <li className={"custom-dot " + dotActive + arrowstyle}>
        <button onClick={() => onClick && onClick()} />
      </li>
    );
  };

  return (
    <Carousel
      arrows={false}
      customButtonGroup={<CustomButtonGroupAsArrows className={arrowstyle} />}
      customDot={<CustomDots />}
      draggable={false}
      infinite={false}
      keyBoardControl={true}
      renderButtonGroupOutside={true}
      renderDotsOutside={true}
      responsive={responsive}
      showDots={true}
      slidesToSlide={4}
    >
      {children}
    </Carousel>
  );
};

export default CarouselWrapper;
