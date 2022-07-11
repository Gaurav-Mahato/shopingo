import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
  return pages > 1 && (
    <Pagination>
        {[...Array(pages).keys()].map(x => (
            <Link style={{
                margin: '10px',
                textDecoration: 'none'
            }} key ={x+1} to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`}>
               <Pagination.Item active={true}>{x+1}</Pagination.Item>
            </Link>
        ))}
        
    </Pagination>
  )
  
}

export default Paginate