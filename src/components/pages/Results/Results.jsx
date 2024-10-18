import React, { useEffect, useState } from 'react'
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { producturl } from '../../../Api/endPoints';
import ResultsStyle from './Results.module.css'
import ProductCard from '../../Products/ProductCard';
import Loader from '../../Loader/Loader';

const Results = () => {
    const [results, setResults] = useState([])
     const [isLoading, setIsLoading] = useState(false);
    const { categoryName } = useParams();
    useEffect(() =>{
        setIsLoading(true);
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    },[])

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}> Results</h1>
          <p style={{ padding: "30px" }}>Categoty / {categoryName}</p>
          <hr />
          <div className={ResultsStyle.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results
