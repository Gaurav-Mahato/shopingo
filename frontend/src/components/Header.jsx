import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import "./bootstrap.min.css";
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Container>
               <Link to="/" style={{textDecoration: "none"}}><Navbar.Brand>ShopinGo</Navbar.Brand></Link>
              
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
               <Nav style={{marginLeft: "auto"}}>
                  <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                  <Nav.Link href="/login"><i className="fas fa-user"></i>Login</Nav.Link>
               </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    )
}

export default Header;