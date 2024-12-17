import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader'
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
  // renaming id to productId
  const { id: productId } = useParams();

  // use dispatch to call addToCart
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set product qty
  const [qty, setQty] = useState(1);

  // individual productApiSlice replacing fetch() with redux
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  }

  return (
    <div>
    <Link className='btn btn-light my-3' to="/">Go Back</Link>

    { isLoading? (
      <Loader />
    ) : error? (
      <Message variant='danger'>{ error?.data?.message || error.error }</Message>
    ) : (<Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={4}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </ListGroup.Item>

        <ListGroup.Item>
          Price: ${product.price}
        </ListGroup.Item>
        
        <ListGroup.Item>
          Description: {product.description}
        </ListGroup.Item>
      </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {/* show this if stock > 0 */}
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value)) }>
                      {/* number of qty for user to select is based on stock */}
                      {/* below uses an array to get the number of product in stock, then how 'keys' to add 1 to each index to prevent 0 */}
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          { x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              {/* if out of stock, button will no be clickable */}
              <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                Add To Cart
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>)}
  </div>
  );
};

export default ProductScreen;