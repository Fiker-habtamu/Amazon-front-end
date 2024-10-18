import React, { useEffect, useState } from 'react'
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { producturl } from '../../../Api/endPoints'
import ProductCard from '../../Products/ProductCard'
import Loader from '../../Loader/Loader'

const ProductDetail = () => {
  const [product,setProduct] =useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { productId } = useParams();
  useEffect(()=>{
      setIsLoading(true);
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

      })
  },[])
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail
