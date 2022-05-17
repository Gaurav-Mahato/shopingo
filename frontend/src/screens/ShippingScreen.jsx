import React, {useState} from "react";
import { Form, Button} from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({history}) => {
    const {shippingAddress} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            postalCode,
            country
        }))
        history.push("/payment")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
               <Form.Group controlId="name">
                 <Form.Label>Address</Form.Label>
                 <Form.Control required type="text" placeholder="Enter your Address" value={address} onChange={(e) => {setAddress(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="city">
                 <Form.Label>City</Form.Label>
                 <Form.Control type="text" placeholder="Enter your city" value={city} onChange={(e) => {setCity(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="postal-code">
                 <Form.Label>Postal Code</Form.Label>
                 <Form.Control type="text" placeholder="Enter your postal code" value={postalCode} onChange={(e) => {setPostalCode(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="country">
                 <Form.Label>Country</Form.Label>
                 <Form.Control type="text" placeholder="Enter your country" value={country} onChange={(e) => {setCountry(e.target.value)}}></Form.Control>
               </Form.Group>
               <Button className="mt-3" type="submit" variant="primary">Continue</Button>
            </Form>
            
        </FormContainer>
    )
}

export default ShippingScreen