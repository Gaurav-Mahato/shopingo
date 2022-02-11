import React,{useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
      dispatch(listProducts())
    },[dispatch])

    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    return(
        <>
          <h1>Latest Products</h1>
          {loading ? <Loader /> : error ? <Message /> : <Row>
              {products.map(product => {
                  return(
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  )
              })}
          </Row>}
          
        </>
    )
}

export default HomeScreen;