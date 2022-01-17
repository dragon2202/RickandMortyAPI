import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { stringSplit } from './stringSplit'

const Content = ({ id }) => {
    const [character, setCharacter] = useState(null)
    const [firstSeen, setFirstSeen] = useState(null)
    const url = 'https://rickandmortyapi.com/api/character/' + id

    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            }
            return res.json()
        }).then((result) => {//fetches character
            fetch(result.episode[0]).then(res => res.json()).then((result) => {//fetches characters first spisode
                setFirstSeen(result)
            })
            setCharacter(result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (character === null || firstSeen === null) {
        return (
            <div style={{ textAlign: 'center' }}>Loading...</div>
        )
    }
    return (
        <Card style={{ width: '600px' }}>
            <Card.Body className="left-body" style={{ display: 'flex', padding: '0' }}>
                <Card.Img src={character.image} style={{ width: '50%' }} />
                <Card.Body className="right-body" style={{ width: '50%' }}>
                    <Card.Title style={{ fontSize: '1rem' }}><Link to={"/character/" + character.id}>{character.name}</Link></Card.Title>
                    <Card.Text as="div">
                        Status - {character.status}
                    </Card.Text>
                    <Card.Text as="div">
                        Species - {character.species}
                    </Card.Text>
                    <Card.Text as="div">
                        {(character.type !== "") ? <Card.Text> Subspecies - {character.type} </Card.Text> : <Card.Text> Subspecies - None </Card.Text>}
                    </Card.Text>
                    <Card.Text as="div">
                        Origin - <br /> {(character.origin.name === "unknown") ? character.origin.name : <Link to={"/location/" + stringSplit(character.origin.url)}>{character.origin.name}</Link>}
                    </Card.Text>
                    <Card.Text as="div">
                        Last Known Location - <br /> {(character.location.name === "unknown") ? character.location.name : <Link to={"/location/" + stringSplit(character.location.url)}>{character.location.name}</Link>}
                    </Card.Text>
                    {(character.type !== "") ? <Card.Text as="div"> Type - {character.type} </Card.Text> : null}
                    <Card.Text as="div">
                        Gender - {character.gender}
                    </Card.Text>
                    <Card.Text as="div">
                        First Seen In - <br /> <Link to={"/episode/" + firstSeen.id}>{firstSeen.name}</Link> - {firstSeen.episode}
                    </Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}

const CHARACTER_FIRSTSEEN = () => {
    const url = "https://rickandmortyapi.com/api/character"
    const [totalCharacters, setTotalCharacters] = useState(null)
    useEffect(() => {
        fetch(url).then(res => {
            if (res.status >= 400 && res.status < 600) {
                throw new Error("Bad response from server");
            }
            return res.json()
        }).then((result) => {
            setTotalCharacters(result.info.count)
        })
    }, [])

    if (totalCharacters === null) {
        return (
            <main className="home">
                <section>
                    <h4 className="home-header">Home</h4>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </section>
            </main>
        )
    }
    return (
        <div className='card-grid'>
            <div className="group-one">
                <div className='item-one'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
                <div className='item-two'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
            </div>
            <div className="group-two">
                <div className='item-one'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
                <div className='item-two'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
            </div>
            <div className="group-three">
                <div className='item-one'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
                <div className='item-two'>
                    <Content id={Math.floor(Math.random() * totalCharacters) + 1} />
                </div>
            </div>
        </div>
    )
}

export default CHARACTER_FIRSTSEEN