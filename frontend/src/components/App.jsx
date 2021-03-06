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
import ShippingScreen from "../screens/ShippingScreen"
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import UserListScreen from "../screens/UserListScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductEditScreen from "../screens/ProductEditScreen"
import OrderListScreen from "../screens/OrderListScreen";

class App extends React.Component{
    render(){
        return(
            <Router>
                <Header />
                <main className="py-3">
                  <Container>
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/place-order" component={PlaceOrderScreen} />
                    <Route path="/admin/userlist" component={UserListScreen} />
                    <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                    <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
                    <Route path="/admin/productlist" component={ProductListScreen} />
                    <Route path="/search/:keyword" component={HomeScreen} exact />
                    <Route path="/page/:pageNumber" component={HomeScreen} exact />
                    <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
                    <Route path='/admin/orderlist' component={OrderListScreen} />
                  </Container>
                </main>
                <Footer />
            </Router>
        )
    }
}

export default App;