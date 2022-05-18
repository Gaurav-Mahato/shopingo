import React, {useState} from "react";
import { Form, Button, Col} from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({history}) => {
    const {shippingAddress} = useSelector(state => state.cart)
    if(!shippingAddress){
        history.push("/shipping")
    }
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/place-order")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
               <Form.Label as='legend'>Select Method</Form.Label>
               <Col>
                   <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                   ></Form.Check>
                   <Form.Check
                    type='radio'
                    label='Stripe'
                    id='Stripe'
                    name='paymentMethod'
                    value='Stripe'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                   ></Form.Check>
               </Col>
               </Form.Group>
               <Button className="mt-3" type="submit" variant="primary">Continue</Button>
            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen