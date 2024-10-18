import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import {img} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselStyle from './CarouselEffect.module.css'

const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imgItemLink, index) => {
          return <img key={index} src={imgItemLink} />;
        })}

      </Carousel>
      <div className={CarouselStyle.hero_img}></div>
    </>
  );
}

export default CarouselEffect;
