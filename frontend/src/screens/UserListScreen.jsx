import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { listUsers, deleteUser } from "../actions/userActions"
import {Button, Table} from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {Link } from "react-router-dom"

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const {loading, error, users} = useSelector(state => state.userList)
    const {userInfo} = useSelector(state => state.userLogin)
    const {success: successDelete} = useSelector(state => state.userDelete)
    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    },[dispatch,history,successDelete,userInfo])
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger' message={error} /> : (
                <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{color: 'green'}}></i> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className="button-sm">
                                              <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                    <Button variant='danger' className="button-sm" onClick={() => deleteHandler(user._id)}>
                                          <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen