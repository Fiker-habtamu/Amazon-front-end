import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CureencyFormat from "../CurrencyFormat/CureencyFormat";
import ProductStyle from './Product.module.css'
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../Utility/action.type";
const ProductCard = ({ product, flex, renderDesc,renderAdd}) => {
  const { image, title, rating, id, price, description } = product;

  const [state,dispatch] = useContext(DataContext)

  const addToCart =() =>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        rating,
        id,
        price,
        description,
      },
    });
  }


  return (
    <>
      <div
        className={`${ProductStyle.card_container} ${
          flex ? ProductStyle.product_flexed : ""
        }`}
      >
        <Link to={`/products/${id}`}>
          <img src={image} />
        </Link>
        <div>
          <h3>{title}</h3>
          {renderDesc && (
            <div
              style={{
                maxWidth: "750 px",
              }}
            >
              {description}
            </div>
          )}
          <div className={ProductStyle.rating}>
            {/* rating */}
            <Rating value={rating?.rate} precision={0.1} />
            <small>{rating?.count}</small>
          </div>
          <div>
            {/* price */}
            <CureencyFormat amount={price} />
          </div>
          {renderAdd !== false && (
            <button className={ProductStyle.button} onClick={addToCart}>
              add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
