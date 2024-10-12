import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import axios from 'axios';


const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();

  }, []);

  return (
    <>
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
    </>
  )
}

export default HomeScreen