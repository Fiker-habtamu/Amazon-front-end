import React from 'react'
import CarouselEffect from '../../Carousel/CarouselEffect';
import Category from '../../Category/Category';
import LayOut from '../../LayOut/LayOut';
import Product from '../../Products/Product';
import Loader from '../../Loader/Loader';

const Landing = () => {
  return (
    <LayOut>
        <CarouselEffect />
        <Category />
        <Product/>
    </LayOut>
  );
}

export default Landing
