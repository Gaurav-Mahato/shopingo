import React from "react";
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import "./bootstrap.min.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../actions/userActions";
import { SearchBox } from "./SearchBox";
import {Route} from "react-router-dom"

const Header = () => {
  let userLogin = useSelector(state => state.userLogin)
  let {userInfo}  = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
    return (
        <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container>
               <Link to="/" style={{textDecoration: "none"}}><Navbar.Brand>ShopinGo</Navbar.Brand></Link>
              
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav"> 
               <Route render={({history}) => <SearchBox history={history} />} />
               <Nav style={{marginLeft: "auto"}}>
                  <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                  {userInfo !== undefined && userInfo !== null ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown> 
                  ) : (
                    <Nav.Link href="/login"><i className="fas fa-user"></i>Login</Nav.Link>
                  )}
                  {userInfo && userInfo.isAdmin && <NavDropdown title='Admin' id="adminmenu">
                      <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/productlist">Products</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/orderlist">Orders</NavDropdown.Item>
                    </NavDropdown> }
               </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    )
}

export default Header;