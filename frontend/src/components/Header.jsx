import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap"

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" collapseOnSelect>
         <Container>
           <Navbar.Brand href="/">ShopinGo</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                 <Nav.Link href="/cart">Cart</Nav.Link>
                 <Nav.Link href="/login">Login</Nav.Link>
             </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Header;