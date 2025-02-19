import React from 'react'
import Banner from '../components/banner'
import Product from '../components/product'
import Type from '../components/type'
import Feature from '../components/feature'
import New from '../components/new'

import Catagourysection from '../components/categoriesection'

function Home() {
  return (
    <>
      <Banner />
      <Type />
      <Catagourysection />
      <New />
      <Product />
      <Feature />
    </>
  )
}

export default Home