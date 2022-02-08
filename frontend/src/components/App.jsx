import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./bootstrap.min.css";
import {Container} from "react-bootstrap";

class App extends React.Component{
    render(){
        return(
            <>
                <Header />
                <Container>
                  <h1>ShopinGo</h1>
                </Container>
                
                <Footer />
            </>
        )
    }
}

export default App;