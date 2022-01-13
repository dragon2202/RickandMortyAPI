import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import LOCATION_LIST_PAGINATION from './../components/location_list_pagination'

const SearchandFilter = ({ setSearch, setType, setDimension }) => {
    return(
        <div>
            <div className='name-search'>
                Name: <input type="text" maxLength="8" size="20" onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <div className='type-search'>
                Type: <input type="text" maxLength="8" size="20" onChange={(e) => { setType(e.target.value) }} />
            </div>
            <div className='dimension-search'>
                Dimension: <input type="text" maxLength="8" size="20" onChange={(e) => { setDimension(e.target.value) }} />
            </div>
        </div>
    )
}

export default function Location_List() {
    const [locations, setLocations] = useState(null)
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const [dimension, setDimension] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const url = "https://rickandmortyapi.com/api/location"

    useEffect(() => {
        fetch(url + "?page=" + currentPage + "&name=" + search + "&type=" + type + "&dimension=" + dimension).then(res => {
            if (res.status >= 400 && res.status < 600) {
                setCurrentPage(1)
            }
            return res.json()
        }).then(async (result) => {
            setLocations(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, currentPage, search, type, dimension])

    if (locations === null) {//location fetch is not loaded
        return (
            <main className="locations">
                <section>
                    <h4 className="locations-header">Locations</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    if (locations.error === "There is nothing here") {//location fetch is not loaded
        return (
            <main className="locations">
                <section>
                    <h4 className="locations-header">Locations</h4>
                    <SearchandFilter setSearch={setSearch} setType={setType} setDimension={setDimension}/>
                    <p style={{ textAlign: 'center' }}>Location not found</p>
                </section>
            </main>
        )
    }

    return (
        <main className="locations">
            <section>
                <h4 className="locations-header">Locations</h4>
                <SearchandFilter setSearch={setSearch} setType={setType} setDimension={setDimension}/>
                <LOCATION_LIST_PAGINATION currentPage={currentPage} setCurrentPage={setCurrentPage} numofPages={locations.info.pages}/>
                <Card className="location-table">
                    <Card.Header style={{ textAlign: 'center' }}>All Locations in Rick and Morty</Card.Header>
                    <Table className='table'>
                        <thead>
                            <tr>
                                <th>Location Name</th>
                                <th>Location Type</th>
                                <th>Dimension</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //Maps out all the episodes the character has been on
                                locations.results.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td><Link to={"/location/" + item.id}>{item.name}</Link></td>
                                            <td>{item.type}</td>
                                            <td>{item.dimension}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Card>
            </section>
        </main>
    )
}