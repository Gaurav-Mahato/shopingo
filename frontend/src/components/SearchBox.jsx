import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap"

export const SearchBox = ({history}) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
        history.push(`/search/${keyword}`)
    }else{
        history.push("/")
    }
  }
    return (
    <>
        <Form onSubmit={submitHandler} inline style={{display: 'flex', marginLeft: '120px'}}>
            <Form.Control type='text' placeholder='Search Products...' onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5' 
            ></Form.Control>
            <Button type='submit' variant='outline-dark' className='p-2' style={{marginLeft: '10px'}}>Search</Button>
        </Form>
    </>
  )
}
