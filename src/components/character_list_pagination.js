import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

//handles the logic of pagination to display 1-6. after 3 the pagination will be centered around the current page and the offset numbers
//Displays (currentPage is 1,2,3) => 1,2,3,4,5,6 => (4) => 2,3,4,5,6 => (5) => 3,4,5,6,7
function FirstSix(currentPage) {
    if(currentPage < 4){
        return true
    } else {
        return false
    }
}

//handles the logic of pagination to display maxPageNum. Before the max page - 3 the pagination will be centered around the current page and the offset numbers
//Displays (if maxpage is 100, currentPage is 100, 99, 98) 96,97,98,99,100 => (97) => 95,96,97,98,99 => (96) => 94,95,96,97,98 
function LastSix(currentPage , maxPage) {
    const lastSix = [maxPage, maxPage - 1, maxPage - 2, maxPage - 3]
    if(lastSix.includes(currentPage)) {
        return true
    } else {
        return false
    }
}

const CHARACTER_LIST_PAGINATION = ({ currentPage, setCurrentPage, numofPages, setUrl, next, prev }) => {
    //If number of pages is less than 7, sets the pagination to a fixed set of numbers. Only applicable to search query.
    if (numofPages < 7) {
        return(
            <Pagination className="pagination">
                <Pagination.Item active={currentPage === 1} onClick={() => {
                    setCurrentPage(1)
                }}>
                    1
                </Pagination.Item>
                {
                    (numofPages >= 2) ? 
                        <Pagination.Item active={currentPage === 2} onClick={() => {
                            setCurrentPage(2)
                        }}>
                            2
                        </Pagination.Item>
                    :
                        null
                }
                {
                    (numofPages >= 3) ? 
                        <Pagination.Item active={currentPage === 3} onClick={() => {
                            setCurrentPage(3)
                        }}>
                            3
                        </Pagination.Item>
                    :
                        null
                }
                {
                    (numofPages >= 4) ? 
                    <Pagination.Item active={currentPage === 4} onClick={() => {
                        setCurrentPage(4)
                    }}>
                        4
                    </Pagination.Item>
                    :
                        null
                }
                {
                    (numofPages >= 5) ? 
                        <Pagination.Item active={currentPage === 5} onClick={() => {
                            setCurrentPage(5)
                        }}>
                            5
                        </Pagination.Item>
                    :
                        null
                }
                {
                    (numofPages >= 6) ? 
                        <Pagination.Item active={currentPage === 6} onClick={() => {
                            setCurrentPage(6)
                        }}>
                            6
                        </Pagination.Item>
                    :
                        null
                }
            </Pagination>
        )
    }
    //Dynamic Pagination to handle the first 6 pages, last 6 pages and between. Functions up above explains the logic better
    return(
        <Pagination className="pagination">
            <Pagination.First onClick={() => { setCurrentPage(1)}}/>
            {
                //If there is a previous page
                (prev !== null) ? 
                    <Pagination.Prev onClick={() => {setCurrentPage(currentPage - 1)}}/> 
                : 
                    <Pagination.Prev />
            }
            <Pagination.Item active={(currentPage === 1) ? true : false} onClick={() => { setCurrentPage(1) }}>
                1
            </Pagination.Item>
            <Pagination.Ellipsis />
            {
                FirstSix(currentPage) ? 
                    <Pagination.Item active={currentPage === 2} onClick={() => { setCurrentPage(2) }}>
                        2
                    </Pagination.Item> 
                :
                    LastSix(currentPage, numofPages) ?
                        <Pagination.Item active={currentPage === numofPages - 5} onClick={() => {  setCurrentPage(numofPages - 5) }}>
                            {numofPages - 5}
                        </Pagination.Item>     
                    :
                        <Pagination.Item onClick={() => { setCurrentPage(currentPage - 2) }}>
                            {currentPage - 2}
                        </Pagination.Item>
            }
            {
                FirstSix(currentPage) ? 
                    <Pagination.Item active={currentPage === 3} onClick={() => { setCurrentPage(3) }}>
                        3
                    </Pagination.Item> 
                :
                    LastSix(currentPage, numofPages) ?
                        <Pagination.Item active={currentPage === numofPages - 4} onClick={() => { setCurrentPage(numofPages - 4) }}>
                            {numofPages - 4}
                        </Pagination.Item>     
                    :
                        <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>
                            {currentPage - 1}
                        </Pagination.Item>
            }
            {
                FirstSix(currentPage) ? 
                    <Pagination.Item active={currentPage === 4} onClick={() => { setCurrentPage(4) }}>
                        4
                    </Pagination.Item> 
                : 
                    LastSix(currentPage, numofPages) ?                        
                        <Pagination.Item active={currentPage === numofPages - 3} onClick={() => { setCurrentPage(numofPages - 3) }}>
                            {numofPages - 3}
                        </Pagination.Item>         
                    :
                        <Pagination.Item active="true">{currentPage}</Pagination.Item>
            }
            {
                FirstSix(currentPage) ? 
                    <Pagination.Item active={currentPage === 5} onClick={() => { setCurrentPage(5) }}>
                        5
                    </Pagination.Item> 
                : 
                    LastSix(currentPage, numofPages) ?
                        <Pagination.Item active={currentPage === numofPages - 2} onClick={() => { setCurrentPage(numofPages - 2) }}>
                            {numofPages - 2}
                        </Pagination.Item>  
                    :
                        <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>
                            {currentPage + 1}
                        </Pagination.Item>
            }
            {
                FirstSix(currentPage) ? 
                    <Pagination.Item active={currentPage === 6} onClick={() => { setCurrentPage(6) }}>
                        6
                    </Pagination.Item> 
                :
                    LastSix(currentPage, numofPages) ?                        
                        <Pagination.Item active={currentPage === numofPages - 1} onClick={() => { setCurrentPage(numofPages - 1) }}>
                            {numofPages - 1}
                        </Pagination.Item>         
                    :
                        <Pagination.Item onClick={() => { setCurrentPage(currentPage + 2) }}>
                            {currentPage + 2}
                        </Pagination.Item>
            }

            <Pagination.Ellipsis />
            <Pagination.Item active={(currentPage === numofPages) ? true : false} onClick={() => { setCurrentPage(numofPages) }}>
                {numofPages}
            </Pagination.Item>
            {
                (next !== null) ? 
                    <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }}/> 
                : 
                    <Pagination.Next />
            }
            <Pagination.Last onClick={() => { setCurrentPage(numofPages) }}/>
        </Pagination>
    )
}

export default CHARACTER_LIST_PAGINATION