import React, {useState,useEffect} from "react";
import {Form,Row,Col,Button, Table} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails} from "../actions/userActions"
import { userUpdateProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../actions/types";
import { listMyOrders } from "../actions/orderActions";
import {Link} from "react-router-dom"

const ProfileScreen = ({location,history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails;
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    const {success} = useSelector(state => state.userUpdateProfile)
    const orderMyList = useSelector(state => state.orderMyList)
    const {loading:loadingOrders, error:errorOrders, orders} = orderMyList
    
    useEffect(() => {
        if(!userInfo){
            history.push("/login")
        }
        else{
            if(!user.name){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else{
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    },[history,userInfo, dispatch,user])
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(userUpdateProfile({id: user._id,name,email,password}))
            // history.push("/")
        }
    }
    return(
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant="danger" message={error}></Message>}
                {message && <Message variant="danger" message={message}></Message>}
                {success && <Message variant="success" message="Profile Updated"></Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit = {submitHandler}>
                   <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                     <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
                   </Form.Group>
                   <Form.Group controlId="email">
                     <Form.Label>Email Address</Form.Label>
                     <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
                   </Form.Group>
                   <Form.Group controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></Form.Control>
                   </Form.Group>
                   <Form.Group controlId="confirmPassword">
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></Form.Control>
                   </Form.Group>
                   <Button style={{'marginTop': '10px'}} type="submit" variant="primary">
                       Update
                   </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger" message={errorOrders} /> : 
                   <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map (order => <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                            <td><Link to={`/order/${order._id}`}>Details</Link></td>
                        </tr>)}
                    </tbody>
                   </Table>
                }
            </Col>
        </Row>
    )

}

export default ProfileScreen;