import React, {useState,useEffect} from "react";
import {Form,Row,Col,Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails} from "../actions/userActions"
import { userUpdateProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../actions/types";

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
    
    useEffect(() => {
        if(!userInfo){
            history.push("/login")
        }
        else{
            if(!user.name){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
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
            </Col>
        </Row>
    )

}

export default ProfileScreen;