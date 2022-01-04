import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import LOCATION_LIST_PAGINATION from './../components/location_list_pagination'

export default function Location_List() {
    const [locations, setLocations] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const url = "https://rickandmortyapi.com/api/location"

    useEffect(() => {
        fetch(url + "?page=" + currentPage).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            }
            return res.json()
        }).then(async (result) => {
            setLocations(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, currentPage])

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

    return (
        <main className="locations">
            <section>
                <h4 className="locations-header">Locations</h4>
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
                                            <td>{item.name}</td>
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