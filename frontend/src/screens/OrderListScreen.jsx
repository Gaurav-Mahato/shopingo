import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { listOrders } from "../actions/orderActions"
import {Button, Table} from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {Link } from "react-router-dom"

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()
    const {loading, error, orders} = useSelector(state => state.orderList)
    const {userInfo} = useSelector(state => state.userLogin)
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo])
    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger' message={error} /> : (
                <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10): <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10): <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                <td style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <Link to={`/order/${order._id}`}>
                                        <Button variant='light' className="button-sm text-black">
                                              Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen