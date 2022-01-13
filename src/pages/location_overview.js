import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

export default function Location_Overview() {
    let { id } = useParams()
    const [location, setLocation] = useState(null)
    const [residents, setResidents] = useState([])
    const url = 'https://rickandmortyapi.com/api/location/' + id

    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            } else {
                return res.json()
            }
        }).then(async result => {
            setLocation(result)
            for (let i = 0; i < result.residents.length; i++) {
                await fetch(result.residents[i]).then(res => res.json()).then((residentResult) => {//fetches location's residents
                    setResidents(residents => [...residents, residentResult])
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (location === null) {
        return (
            <main className="location_overview">
                <section>
                    <h4 className="location_overview_header">Location Overview</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    return (
        <main className="location_overview">
            <section>
                <h4 className="location_overview_header">Location: {location.name}</h4>
                <div className="nested-section">
                    <Card className="text-center">
                        <Card.Body>
                            <Table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Dimension</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{location.name}</td>
                                        <td>{location.type}</td>
                                        <td>{location.dimension}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="residents-card">
                        <Card.Header>Residents in {location.name}</Card.Header>
                        <Card.Body>
                            <Table className='table'>
                                <thead>
                                    <tr>
                                        <th className="th-image">Image</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Species</th>
                                        <th>Subspecies</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        //Maps out all the residents the location has
                                        residents.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="td-image"><img className="picture" src={item.image} alt="Not Found"/></td>
                                                    <td><Link to={"/character/" + item.id}>{item.name}</Link></td>
                                                    <td>{item.status}</td>
                                                    <td>{item.species}</td>
                                                    {(item.type === '') ? <td>None</td> : <td>{item.type}</td>}
                                                    <td>{item.gender}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>

            </section>
        </main>
    )
}