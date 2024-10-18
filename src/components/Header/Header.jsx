import React, { useContext } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import HeadStyle from './Header.module.css'
import Lower from './Lower';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../Utility/firebase'


const Header = () => {

  const [{user,basket},dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount,item) =>{
    return item.amount + amount
  },0)
  return (
    <section className={HeadStyle.fixed}>
      <section className={`${HeadStyle.header_container}`}>
        {/* logo section */}
        <div className={HeadStyle.logo_container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <span>
            {/* logo */}
            <MdLocationPin />
          </span>
          <div className={HeadStyle.delivery}>
            <p>Deliverd to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        <div className={HeadStyle.search}>
          {/* search */}
          <select name="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="search product" />
          <IoSearch size={30} />
        </div>
        <div className={HeadStyle.order_container}>
          <Link to="" className={HeadStyle.language}>
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2480140689/display_1500/stock-vector-usa-waving-flag-pattern-background-realistic-national-flag-design-abstract-vector-template-2480140689.jpg"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          {/* Three components */}
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span> Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* orders */}
          <Link to="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          {/* cart */}
          <Link to="/cart" className={HeadStyle.cart}>
            <LuShoppingCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </section>
      <Lower />
    </section>
  );
}

export default Header
