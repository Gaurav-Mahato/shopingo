import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form,Row,Col,Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails,updateUser} from "../actions/userActions"
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../actions/types";

const UserEditScreen = ({match,history}) => {
    const id = match.params.id
    const [email,setEmail] = useState('');
    const [isAdmin,setIsAdmin] = useState(false)
    const [name,setName] = useState('')
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails
    const {success: successUpdate, error: errorUpdate,loading: loadingUpdate} = useSelector(state => state.userUpdate)
    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }
        else{
            if(!user || id !== user._id){
                dispatch(getUserDetails(id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch,user,history])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            _id: id,
            name,
            email,
            isAdmin
        }))
    }
    return(
        <>
        <Link to="/admin/userlist" className="btn btn-light my-3">Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger' message={errorUpdate} />}
            {loading ? <Loader /> : error ? <Message variant="danger" message={error}></Message> : (
                <Form onSubmit = {submitHandler}>
                <Form.Group controlId="name">
                 <Form.Label>Name</Form.Label>
                 <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="email">
                 <Form.Label>Email Address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="isadmin">
                 <Form.Check type="checkbox" label="Is Admin" value={isAdmin} checked={isAdmin} onChange={(e) => {setIsAdmin(e.target.checked)}}></Form.Check>
               </Form.Group>
               <Button style={{'marginTop': '10px'}} type="submit" variant="primary">
                   Update
               </Button>
            </Form>
            )} 
        </FormContainer>
      </>
    )

}

export default UserEditScreen;