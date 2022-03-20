import React, {useState, useEffect} from "react";
import {Row, Col, ListGroup, Image, Card, Button,Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({history, match}) => {
    const [qty,setQty] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match.params.id])
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails;
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return(
        <>
            {loading ? <Loader /> : error ? <Message msg={error} /> : <><Link className="btn btn-light text-black my-3" to="/">Go Back</Link>
            <Row className="py-3">
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid style={{borderRadius: "2%"}} />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        ${product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStocks>0 ? "Available" : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStocks > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                {[...Array(product.countInStocks).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStocks === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row></>}
            
        </>
    )
}

export default ProductScreen;