import React, {useEffect} from "react";
import {Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap"
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const addDecimals = (num) => {
        return Math.round((num*100)/100).toFixed(2)
    }
    const cart = useSelector(state => state.cart)
    const {cartItems, shippingAddress, paymentMethod } = cart
    cart.itemsPrice = addDecimals(cartItems.reduce((acc,item) => acc + item.price * item.qty,0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    const {itemsPrice, taxPrice, totalPrice,shippingPrice} = cart
    const {address, city, postalCode, country} = shippingAddress

    const {order, success, error} = useSelector(state => state.orderCreate)
    const placeOrderHandler = () => {
        const result = {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        }
        dispatch(createOrder(result))
    }
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])
    return(
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
              <Col md={8}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h2>Shipping</h2>
                          <p>
                              <strong>Address: </strong>
                              {address}, {city}{' '}{postalCode}, {country}
                          </p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Payment Method</h2>
                          <strong>Method: </strong>
                          {paymentMethod}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Order Items</h2>
                          {cartItems.length === 0 ? <Message message="Your Cart is empty"></Message> : (
                              <ListGroup variant="flush">
                                  {cartItems.map((item,index) => (
                                      <ListGroup.Item key={index}>
                                         <Row>
                                             <Col md={1}>
                                                 <Image src={item.image} alt={item.name} fluid rounded/>
                                             </Col>
                                             <Col>
                                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                                             </Col>
                                             <Col md={4}>
                                                 {item.qty} x ${item.price} = ${item.qty * item.price}
                                             </Col>
                                         </Row>
                                      </ListGroup.Item>
                                  ))}
                              </ListGroup>
                          )}
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
              <Col md={4}>
                  <Card>
                      <ListGroup variant="flush">
                          <ListGroup.Item>
                              <h2>Order Summary</h2>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Items</Col>
                                  <Col>${itemsPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Shipping</Col>
                                  <Col>${shippingPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Tax</Col>
                                  <Col>${taxPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Total</Col>
                                  <Col>${totalPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              {error && <Message message={error}></Message>}
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                          </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
        </>
    )
}

export default PlaceOrderScreen