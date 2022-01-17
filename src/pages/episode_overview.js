import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

export default function Episode_Overview() {
    let { id } = useParams()
    const [episode, setEpisode] = useState(null)
    const [characters, setCharacters] = useState([])
    const url = "https://rickandmortyapi.com/api/episode/" + id

    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            } else {
                return res.json()
            }
        }).then(async result => {
            setEpisode(result)
            for(let i = 0; i < result.characters.length; i++) {
                await fetch(result.characters[i]).then(res => res.json()).then((charactersResults) => {//fetches episodes characters
                    setCharacters(characters => [...characters, charactersResults])
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (episode === null) {
        return (
            <main className="episode_overview">
                <section>
                    <h4 className="episode_overview_header">Episode Overview</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    return (
        <main className="episode_overview">
            <section>
                <h4 className="episode_overview_header">Episode: {episode.name}</h4>
                <div className="nested-section">
                    <Card className="text-center">
                        <Table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Air Date</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{episode.name}</td>
                                    <td>{episode.air_date}</td>
                                    <td>{episode.episode}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>

                    <Card className="characters-card">
                        <Card.Header>Characters in {episode.name}</Card.Header>
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
                                        characters.map((item) => {
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