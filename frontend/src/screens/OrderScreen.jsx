import React, {useEffect} from "react";
import {Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";


const OrderScreen = ({match}) => {
    const dispatch = useDispatch()
    const orderId = match.params.id
    const {order, loading, error} = useSelector(state => state.orderDetails)
    const {orderItems, shippingAddress, paymentMethod, taxPrice, totalPrice,shippingPrice} = order
    const {address, city, postalCode, country} = shippingAddress
    if(!loading){
        const addDecimals = (num) => {
            return Math.round((num*100)/100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0))
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    },[])
    return loading ? <Loader /> : error ? <Message variant="danger" message={error} /> : <>
        <h1>Order {order._id}</h1>
        <Row>
              <Col md={8}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h2>Shipping</h2>
                          <p><strong>Name: </strong>{order.user.name}</p>
                          <p><strong>Email :</strong>{' '}<a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                          <p>
                              <strong>Address: </strong>
                              {address}, {city}{' '}{postalCode}, {country}
                          </p>
                          {order.isDelivered ? <Message variant="success" message={`Delivered on ${order.deliveredAt}`} /> : <Message variant="danger" message="Not delivered" />}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Payment Method</h2>
                          <p><strong>Method: </strong>
                          {paymentMethod}</p>
                          {order.isPaid ? <Message variant="success" message={`Paid on ${order.paidAt}`} /> : <Message variant="danger" message="Not Paid" />}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Order Items</h2>
                          {orderItems.length === 0 ? <Message message="Your Cart is empty"></Message> : (
                              <ListGroup variant="flush">
                                  {orderItems.map((item,index) => (
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
                                  <Col>${order.itemsPrice}</Col>
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
                          {/* <ListGroup.Item>
                              <Button type="button" className="btn-block" disabled={orderItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                          </ListGroup.Item> */}
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
    </>
}

export default OrderScreen