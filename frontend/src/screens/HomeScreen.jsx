import React,{useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const HomeScreen = ({match}) => {
    const dispatch = useDispatch();
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    
    useEffect(() => {
      dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])

    const productList = useSelector(state => state.productList);
    const {loading, products, error,page, pages} = productList;

    return(
        <>
          <h1>Latest Products</h1>
          {loading ? <Loader /> : error ? <Message message={error} /> : <><Row>
              {products.map(product => {
                  return(
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  )
              })}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""}></Paginate>
          </>}
          
        </>
    )
}

export default HomeScreen;