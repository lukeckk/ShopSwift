import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png';

const Header = () => {  
  //useSelector is used to access 'initialState' in cartSlice.js
  const { cartItems } = useSelector((state) => state.cart )  
  const { userInfo } = useSelector((state) => state.auth )  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // unwrap the mutation promise
      dispatch(logout()); // clears local storage
      navigate('/login') // direct to login page
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
           {/* Link container is used instead of link like in product.jsx */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt="ProShop" />
                ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='danger' style={{marginLeft:'5px'}}>
                      {/* reduce is array function to all the total, a holds the running total, c is the qty, 0 is defaultwhere v */}
                      {cartItems.reduce((a, c) => a + c.qty, 0 )} 
                    </Badge>
                  )
                }
              </Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ):(
                <LinkContainer to='/login'>
                <Nav.Link href='/login'>
                  <FaUser /> Sign in
                </Nav.Link>
                </LinkContainer>
              ) }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}


export default Header