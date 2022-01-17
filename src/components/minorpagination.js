import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

//Pagination for location and episode, less than 3 pages unlike characters 47+ pages
const MinorPagination = ({ currentPage, setCurrentPage, numofPages }) => {
    var items = []
    for(let index = 1; index < numofPages + 1; index++) {
        items.push(
            <Pagination.Item key={index} active={currentPage === index} onClick={() => {setCurrentPage(index)}}>
                {index}
            </Pagination.Item>
        )
    }
    return(
        <Pagination className="pagination">
            {items}
        </Pagination>
    )
}

export default MinorPagination