import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import MinorPagination from '../components/minorpagination'

export default function Episode_List() {
    const [episodes, setEpisodes] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const url = "https://rickandmortyapi.com/api/episode"

    useEffect(() => {
        fetch(url + "?page=" + currentPage).then(res => {
            if (res.status >= 400 && res.status < 600) {
                setCurrentPage(1)
            }
            return res.json()
        }).then(async (result) => {
            setEpisodes(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url, currentPage])

    if (episodes === null) {
        return (
            <main className="episodes">
                <section>
                    <h4 className="episodes-header">Episodes</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    return (
        <main className="episodes">
            <section>
                <h4 className="episodes-header">Episodes</h4>
                <MinorPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numofPages={episodes.info.pages}/>
                <Card className="episodes-table">
                    <Card.Header style={{ textAlign: 'center' }}>All Locations in Rick and Morty</Card.Header>
                    <Table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Air Date</th>
                                <th>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //Maps out all the episodes the character has been on
                                episodes.results.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td><Link to={"/episode/" + item.id}>{item.name}</Link></td>
                                            <td>{item.air_date}</td>
                                            <td>{item.episode}</td>
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