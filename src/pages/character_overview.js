import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

export default function Character_Overview() {
    let { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [episodes, setEpisodes] = useState([])
    const url = 'https://rickandmortyapi.com/api/character/' + id

    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
              }
              return res.json()
        }).then(async (result) => {//fetches character
            for (var i = 0; i < result.episode.length; i++) {
                await fetch(result.episode[i]).then(res => res.json()).then((episodeResult) => {//fetches characters first spisode
                    setEpisodes(episodes => [...episodes, episodeResult])
                })
            }
            setCharacter(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if (character === null) { //character fetch is not loaded
        return (
            <main className="overview">
                <section>
                    <h4 className="overview-header">Character Overview</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }

    return (
        <main className="overview">
            <section>
                <h4 className="overview-header">Character Overview</h4>
                <div className='nested-section'>
                    <Card className="text-center">
                        <Card.Header>{character.name}</Card.Header>
                        <Card.Img src={character.image} className="image" />
                        <Card.Body>
                            <Card.Text>
                                Status - {character.status}
                            </Card.Text>
                            <Card.Text>
                                Species - {character.species}
                            </Card.Text>
                            {(character.type !== "") ? <Card.Text> Type - {character.type} </Card.Text> : null}
                            <Card.Text>
                                Gender - {character.gender}
                            </Card.Text>
                            <Card.Text>
                                Origin - {character.origin.name}
                            </Card.Text>
                            <Card.Text>
                                Current Location (as of the most current episode) - {character.location.name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="episode-table">
                        <Card.Header style={{ textAlign: 'center' }}>All Episodes this character has appeared</Card.Header>
                        <Table className='table'>
                            <thead>
                                <tr>
                                    <th>Episode Name</th>
                                    <th>Air Date</th>
                                    <th>Episode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //Maps out all the episodes the character has been on
                                    episodes.map(item => {
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.air_date}</td>
                                                <td>{item.episode}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card>
                </div>

            </section>
        </main>
    )
}