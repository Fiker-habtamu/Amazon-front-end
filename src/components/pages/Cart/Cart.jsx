import React, { useContext } from 'react'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import ProductCard from '../../Products/ProductCard'
import CureencyFormat from '../../CurrencyFormat/CureencyFormat'
import { Link } from 'react-router-dom'
import CartStyle from './Cart.module.css'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{basket,user},dispatch] = useContext(DataContext)
    const total = basket.reduce((amount, item) => {
      return item.price * item.amount + amount;
    }, 0);
    const increment = (item) => {
      dispatch({
        type: Type.ADD_TO_BASKET,
        item,
      });
    };
    const decrement =(id) =>{
      dispatch({
        type:Type.REMOVE_FROM_BASKET,
        id,
      })
    }
  return (
    <LayOut>
      <section className={CartStyle.container}>
        <div className={CartStyle.cart_container}>
          <h2>Hello</h2>
          <h1>Your shopining basket</h1>
          <hr />
          {basket?.length == 0 ? (
            <h2>Oops! No item in your cart</h2>
          ) : (
            basket?.map((item, i) => {
           return (
             <section className={CartStyle.cart_product}>
               <ProductCard
                 key={i}
                 product={item}
                 renderDesc={true}
                 flex={true}
                 renderAdd={false}
               />
               <div className={CartStyle.btn_container}>
                 <button
                   className={CartStyle.btn}
                   onClick={() => increment(item)}
                 >
                   <IoIosArrowUp size={25} />
                 </button>
                 <span>{item.amount}</span>
                 <button
                   className={CartStyle.btn}
                   onClick={() => decrement(item.id)}
                 >
                   <IoIosArrowDown size={25} />
                 </button>
               </div>
             </section>
           );
            })
          )}




        </div>

        {basket?.length != 0 && (
          <div className={CartStyle.subtotal}>
            <div>
              <p>Subtotal({basket?.length} items)</p>
              <CureencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to chekout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart
      