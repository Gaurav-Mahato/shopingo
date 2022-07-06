import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { listProducts, deleteProduct } from "../actions/productActions"
import {Button, Table, Row, Col} from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {Link } from "react-router-dom"

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state => state.productList)
    const {userInfo} = useSelector(state => state.userLogin)
    const {success: successDelete, loading: loadingDelete, error: errorDelete} = useSelector(state => state.productDelete)
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            console.log("User detected")
            dispatch(listProducts())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo,successDelete])
    const createProductHandler = () => {
        console.log("Create a product")
    }
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }
    return (
        <>   
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger" message={errorDelete} />}
            {loading ? <Loader /> : error ? <Message variant='danger' message={error} /> : (
                <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className="button-sm">
                                              <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                    <Button variant='danger' className="button-sm" onClick={() => deleteHandler(product._id)}>
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

export default ProductListScreen