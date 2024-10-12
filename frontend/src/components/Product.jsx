import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


// product inserted so it can be called later
const Product = ({productAPI}) => {
  return (
    //  add margin of 3 for top btm, padding of 3 to all sides, rounded corner
    <Card className='my-3 p-3 rounded'>
      {/* Link is used for routing without loading a diffferent page */}
      <Link to={`/product/${productAPI._id}`}>
        <Card.Img src={productAPI.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${productAPI._id}`}>
           {/* setting it as div because it is h5 by default */}
          <Card.Title as="div" className='product-title' >
            <strong>{productAPI.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={ productAPI.rating } text={`${productAPI.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">
          ${productAPI.price}
        </Card.Text>
      </Card.Body>
    </Card> 

  )
}

export default Product