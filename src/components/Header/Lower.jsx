import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import HeadStyle from "./Header.module.css";

const Lower = () => {
  return (
    <>
      <div className={HeadStyle.lower_container}>
        <ul>
          <li>
            <AiOutlineMenu/>
            <p>All</p>
          </li>
          <li>Today's Deals</li>
          <li>Costumer Service</li>
          <li>Registry</li>
          <li>Gifr Cards</li>
          <li>Sell</li>
        </ul>
      </div>
    </>
  );
}

export default Lower
