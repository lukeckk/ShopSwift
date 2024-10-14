import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
const { data: products, isLoading, error } = useGetProductsQuery();


  return (
    <>
      { isLoading ? (
        <Loader />
      ): error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : 
      (<>
      <h1>Latest Products</h1>
      <Row>
        { products.map((product) =>(
          // 1 col on small, 2 cols on medium, 3 col on large, 4 col on XL
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            {/* productAPI is the parameter from Product function in Product.jsx */}
            <Product productAPI={product} />
          </Col>
        ))}
      </Row>
      </>) }

      
    </>
  )
}

export default HomeScreen