import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./bootstrap.min.css";
import {Container} from "react-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ProductScreen from "../screens/ProductScreen";

class App extends React.Component{
    render(){
        return(
            <Router>
                <Header />
                <main className="py-3">
                  <Container>
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                  </Container>
                </main>
                <Footer />
            </Router>
        )
    }
}

export default App;