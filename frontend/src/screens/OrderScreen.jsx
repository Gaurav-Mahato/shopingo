import React, {useEffect} from "react";
import {Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader"
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../actions/types";

const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const {success} = orderPay 
    const addDecimals = (num) => {
        return Math.round((num*100)/100).toFixed(2)
    }  
    if(!loading){ 
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item) => acc + item.qty*item.price,0)
        )
    }
    useEffect(() => {
        if(!order || order._id !== orderId || success) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId,success]) 
    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }
    return loading ? <Loader /> : error ? <Message variant="danger" message={error} /> : <>
        <h1>Order {orderId}</h1>
          <Row>
              <Col md={8}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                          <h2>Shipping</h2>
                          <p><strong>Name: </strong> {order.user.name}</p>
                          <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                          <p>
                              <strong>Address: </strong>
                              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                          </p>
                          {order.isDelivered ? <Message variant="success" message="Delivered Successfully" /> : <Message variant="danger" message="Not Delivered" />}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Payment Method</h2>
                          <p><strong>Method: </strong>{order.paymentMethod}</p>
                          
                          {order.isPaid ? <Message variant="success" message="Paid Successfully" /> : <Message variant="danger" message="Not Paid" />}
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h2>Order Items</h2>
                          {order.orderItems.length === 0 ? <Message message="Order is empty"></Message> : (
                              <ListGroup variant="flush">
                                  {order.orderItems.map((item,index) => (
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
                                  <Col>${addDecimals(order.itemsPrice)}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Shipping</Col>
                                  <Col>${addDecimals(order.shippingPrice)}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Tax</Col>
                                  <Col>${addDecimals(order.taxPrice)}</Col>
                              </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>Total</Col>
                                  <Col>${addDecimals(order.totalPrice)}</Col>
                              </Row>
                          </ListGroup.Item>
                          {!order.isPaid && <ListGroup.Item>
                            <Button onClick={successPaymentHandler}>Pay ${addDecimals(order.totalPrice)}</Button>
                          </ListGroup.Item>}
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
    </>
}

export default OrderScreen