import axios from 'axios'
import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form,Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProductDetails, updateProduct} from "../actions/productActions"
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../actions/types";

const ProductEditScreen = ({match,history}) => {
    const id = match.params.id
    const [price,setPrice] = useState(0);
    const [image,setImage] = useState('')
    const [name,setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStocks, setCountInStocks] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails
    const {success: successUpdate, error: errorUpdate,loading: loadingUpdate} = useSelector(state => state.productUpdate)
    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }
        else{
            if(!product || id !== product._id){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name)
                setBrand(product.brand)
                setCategory(product.category)
                setImage(product.image)
                setCountInStocks(product.countInStocks)
                setDescription(product.description)
                setPrice(product.price)
            }
        }
    },[dispatch,product,history,id,successUpdate])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
          _id: id,
          name,
          description,
          brand,
          category,
          image,
          countInStocks,
          price
        }))
    }
    const uploadFileHandler = async(e) => {
      // console.log('Working')
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image',file)
      setUploading(true)
      try{
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const {data} = await axios.post('https://mighty-savannah-06065.herokuapp.com/api/upload', formData, config)
        setImage(data)
        setUploading(false)
      }
      catch(err){
        console.error(err)
        setUploading(false)
      }
    }
    return(
        <>
        <Link to="/admin/productlist" className="btn btn-light my-3 text-black">Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger' message={errorUpdate} />}
            {loading ? <Loader /> : error ? <Message variant="danger" message={error}></Message> : (
                <Form onSubmit = {submitHandler}>
                <Form.Group controlId="name">
                 <Form.Label>Name</Form.Label>
                 <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => {setName(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="price">
                 <Form.Label>Price</Form.Label>
                 <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => {setPrice(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="image">
                 <Form.Label>Image</Form.Label>
                 <Form.Control type="image" placeholder="Enter image url" value={image} onChange={(e) => {setImage(e.target.value)}}></Form.Control>
                 <input type="file" id='image-file' label='Choose file' custom="true" onChange={uploadFileHandler}></input>
                 {uploading && <Loader />}
               </Form.Group>
               <Form.Group controlId="brand">
                 <Form.Label>Brand</Form.Label>
                 <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => {setBrand(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="category">
                 <Form.Label>Category</Form.Label>
                 <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => {setCategory(e.target.checked)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="countInStock">
                 <Form.Label>Count In Stock</Form.Label>
                 <Form.Control type="number" placeholder="Enter count in stock" value={countInStocks} onChange={(e) => {setCountInStocks(e.target.value)}}></Form.Control>
               </Form.Group>
               <Form.Group controlId="description">
                 <Form.Label>Description</Form.Label>
                 <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => {setDescription(e.target.checked)}}></Form.Control>
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

export default ProductEditScreen;