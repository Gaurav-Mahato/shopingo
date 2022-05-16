import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./bootstrap.min.css";
import {Container} from "react-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";

class App extends React.Component{
    render(){
        return(
            <Router>
                <Header />
                <main className="py-3">
                  <Container>
                    <Route path="/register" component={RegisterScreen} />
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                  </Container>
                </main>
                <Footer />
            </Router>
        )
    }
}

export default App;