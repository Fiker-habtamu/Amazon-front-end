import React,{useContext,useState} from 'react'
import PaymentStyle from './Payment.module.css'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import ProductCard from '../../Products/ProductCard'
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CureencyFormat from '../../CurrencyFormat/CureencyFormat'
import { axiosInstance } from '../../../Api/axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

const Payment = () => {
  const [{user,basket},dispatch] = useContext(DataContext)

  const totalItem = basket?.reduce((amount, item) => {
      return item.amount + amount;
    }, 0);

    const total = basket.reduce((amount, item) => {
      return item.price * item.amount + amount;
    }, 0);

    const [cardError,setCardError] = useState(null)
    const [proccessing, serProccessing] = useState(false)

      const stripe = useStripe();
      const elements = useElements();
      const navigate = useNavigate()

const handleChange = (e) =>{
  e?.error?.message? setCardError(e?.error?.message) : setCardError("")
}

const handlepayment = async (e) => {
  e.preventDefault();
  try {
    serProccessing(true);
    // step 1 : backend || function ---> contat to the client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    });
    console.log(response.data);
    const clientSecret = response?.data?.clientSecret;
    // step 2 : client side (react side confirmation)
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    console.log(paymentIntent);

    // step 3 : after the confirmation --> order firebase database save, clear basket

    await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // empty the basket
      dispatch({type:Type.EMPTY_BASKET})

    serProccessing(false);
    navigate("/orders",{state:{msg:"you have placed new order"}});
  } catch (error) {
    console.log(error);
    serProccessing(false)
  }



};

  return (
    <LayOut>
      {/* header */}
      <div className={PaymentStyle.payment_header}>
        Check Out ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={PaymentStyle.payment}>
        {/* address */}
        <div>
          <h3>Delivery Address</h3>
          <div className={PaymentStyle.flex}>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,Il</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={PaymentStyle.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Card form */}
        <div className={PaymentStyle.flex}>
          <h3>Payment methods</h3>
          <div className={PaymentStyle.payment_card_container}>
            <div className={PaymentStyle.payment_details}>
              <form action="" onSubmit={handlepayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={PaymentStyle.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CureencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {proccessing ? (
                      <div className={PaymentStyle.loading}>
                        <ClipLoader color='gray' size={13}/>
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment
