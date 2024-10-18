import React from 'react'
import { categoryInfos } from './categoryFullInfo'
import CategoryCard from './CategoryCard'
import CategoryStyle from "./Category.module.css"


const Category = () => {
  return (
    <>
      <div className={CategoryStyle.category_container}>
        {
        categoryInfos.map((infos) => (
          <CategoryCard data={infos} />
        ))
        }
      </div>
    </>
  )
}

export default Category
