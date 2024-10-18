import React,{useContext,useEffect,useState} from 'react'
import LayOut from '../../LayOut/LayOut'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../DataProvider/DataProvider'
import orderStyle from './Orders.module.css'
import ProductCard from '../../Products/ProductCard'


const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={orderStyle.container}>
        <div className={orderStyle.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder) => {
              return (
                <div>
                  <hr />
                  <p>Order Id: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders
