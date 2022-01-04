import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const CHARACTER_FIRSTSEEN = ({ id }) => {
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
            <p style={{ textAlign: 'center' }}>Loading...</p>
        )
    }
    return (
        <Card style={{ width: '600px' }}>
            <Card.Body style={{ display: 'flex', padding: '0' }}>
                <Card.Img src={character.image} style={{ width: '50%' }} />
                <Card.Body style={{ width: '50%' }}>
                    <Card.Title style={{ fontSize: '1rem' }}><Link to={"/character/" + character.id}>{character.name}</Link></Card.Title>
                    <Card.Text>
                        Status - {character.status}
                    </Card.Text>
                    <Card.Text>
                        Species - {character.species} 
                    </Card.Text>
                    <Card.Text>
                        {(character.type !== "") ? <Card.Text> Subspecies - {character.type} </Card.Text> : <Card.Text> Subspecies - None </Card.Text>}
                    </Card.Text>
                    <Card.Text>
                        Last Known Location - <br /> {character.location.name}
                    </Card.Text>
                    {(character.type !== "") ? <Card.Text> Type - {character.type} </Card.Text>: null }
                    <Card.Text>
                        Gender - {character.gender}
                    </Card.Text>
                    <Card.Text>
                        First Seen In - <br /> {firstSeen.name} - {firstSeen.episode}
                    </Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}

export default CHARACTER_FIRSTSEEN