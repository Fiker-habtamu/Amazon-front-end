import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { ImPower } from 'react-icons/im'
import productStyle from './Product.module.css'
import Loader from '../Loader/Loader'

const Product = () => {
    const [Products,setProducts] = useState([])
      const [isLoading, setIsLoading] = useState(false);
    useEffect(() =>{
//         (async () => {
//             try{
//                 const respons = await axios.get("https://fakestoreapi.com/products")
//                  setProducts(respons.data)
//                  console.log(Products)
//             } catch(err){
//                 console.log(err)
//             }
// })();
        setIsLoading(true);

        axios
          .get("https://fakestoreapi.com/products")
          .then((res) => {
            setProducts(res.data);
            setIsLoading(false);

          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);

          });   
    },[])


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={productStyle.products_container}>
          {Products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} 
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Product
