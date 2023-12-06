import React, {useState, useEffect, Fragment} from "react";
import {Row, Col, ListGroup, Image, Card, Button,Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import { listProductDetails,createReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import Meta from "../components/Meta";

const ProductScreen = ({history, match}) => {
    const [qty,setQty] = useState(1);
    const [comment,setComment] = useState('');
    const [rating,setRating] = useState(0);
    const dispatch = useDispatch();
    
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails;

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview} = productCreateReview;
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const addToCartHandler = () => {
        // console.log(qty)
        console.log('Quantity',qty)
        history.push(`/cart/${match.params.id}?qty=${qty}`) 
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(qty)
        dispatch(createReview(match.params.id,{
            rating,
            comment
        }))
    }
    useEffect(() => {
        if(successCreateReview){
            alert('Review Submitted !')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match.params.id,successCreateReview])
    return(
        <>
            {loading ? <Loader /> : error ? <Message msg={error} /> : <>
            <Meta title={product.name} />
            <Link className="btn btn-light text-black my-3" to="/">Go Back</Link>
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
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message variant='info' message="No Reviews" />}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>)}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {errorCreateReview && <Message variant='danger' message={errorCreateReview} />}
                            {userInfo ? <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={e => setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' value={comment} row='3' onChange={(e) => setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button variant='primary' type="submit">
                                    Submit
                                </Button>
                            </Form> : (
                                <Message message="Please login to write a comment" /> 
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>}
            
        </>
    )
}

export default ProductScreen;