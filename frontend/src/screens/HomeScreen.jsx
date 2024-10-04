import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'


const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        { products.map((product) =>(
          // 1 col on small, 2 cols on medium, 3 col on large, 4 col on XL
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen