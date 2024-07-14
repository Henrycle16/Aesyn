import { Children, ReactElement, ReactNode } from "react";
import Carousel from "react-multi-carousel";
import { ButtonGroupProps, ArrowProps, DotProps } from 'react-multi-carousel/lib/types';
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



const CustomButtonGroupAsArrows = ({ next, previous, className }:CarouselButtonGroupProps) => {
  return (
    <div className={className}>
      <button onClick={previous} className="custom-left-arrow"></button>
      <button onClick={next} className="custom-right-arrow"></button>
    </div>
  );
};

const CarouselWrapper = ({children} : Props) => {
  const arrowstyle = Array.isArray(children) && children.length < 4 ? "hidden" : "";
  return (
      <Carousel
        arrows={false}
        className=""
        containerClass=""
        customButtonGroup={<CustomButtonGroupAsArrows className={arrowstyle}/>}
        dotListClass=""
        draggable={false}
        // infinite={true}
        itemClass=""
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
